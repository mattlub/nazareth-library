const Request = require('request');
const jwt = require('jsonwebtoken');

const dbQueries = require('../db_queries');

module.exports = {
  method: 'GET',
  path: '/welcome',
  handler: (request, reply) => {
    /*
    request contains token supplied by Github to say user has given permission to the app
    STEPS:
    1) request access token from GH
    2) request user info from GH
    3) store user info in db
    4) create JWT with some user info
    5) issue auth cookie containing JWT
    */
    const accessTokenRequestBody = {
      code: request.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    };
    const accessTokenRequestOptions = {
      method: 'POST',
      body: accessTokenRequestBody,
      url: 'https://github.com/login/oauth/access_token',
      json: true
    };
    // 1) request access token from GH
    // send the code with the client_secret and client_id to GH, to get the access token
    Request(accessTokenRequestOptions, (tokenError, tokenReponse, tokenBody) => {
      if (tokenError) {
        return reply.redirect('/error');
      }
      if (!tokenBody.access_token) {
        return reply.redirect('/error');
      }
      const githubAccessToken = tokenBody.access_token;
      const userInfoRequestOptions = {
        url: `https://api.github.com/user?access_token=${githubAccessToken}`,
        json: true,
        headers: {
          'User-Agent': 'nazareth library',
          Authorization: `token ${githubAccessToken}`
        }
      };
      // 2) request user info from GH
      return Request.get(userInfoRequestOptions, (infoError, infoResponse, infoBody) => {
        if (infoError) {
          return reply.redirect('/error');
        }
        const userInfo = {
          id: infoBody.id,
          username: infoBody.login,
          location: infoBody.location,
          avatar_url: infoBody.avatar_url,
          github_access_token: githubAccessToken
        };
        console.log('trying to add/update user in db:');
        // 3) store user info in db
        dbQueries.addOrUpdateUser(userInfo, (error) => {
          if (error) {
            console.log('errored trying to add/update user in db:');
            return reply (error)
            // return reply.redirect('./error');
          }
          console.log('successfully added/updated user in db:');
          const jwtOptions = {
            expiresIn: Date.now() + (24 * 60 * 60 * 1000),
            subject: 'github-data'
          };
          // 4) create JWT with some user info
          return jwt.sign(userInfo, process.env.JWT_SECRET, jwtOptions, (error, token) => {
            if (error) {
              return reply (error)
              // return reply.redirect('./error');
            }
            // 5) issue auth cookie containing JWT
            return reply.redirect('/').state('token', token, {
              isHttpOnly: false,
              isSecure: process.env.NODE_ENV === 'PRODUCTION'
            });
          });
        });
      });
    });
  }
};
