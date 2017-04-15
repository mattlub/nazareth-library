const path = require('path');

const hapi = require('hapi');
const vision = require('vision');
const routes = require('./routes.js');
const inert = require('inert');
const handlebars = require('handlebars');
const jwtAuth = require('hapi-auth-jwt2');

const port = process.env.PORT || 4040;

const server = new hapi.Server();

server.connection({
  port
});

server.register([inert, vision, jwtAuth], (err) => {
  if (err) throw err;

  function jwtValidate(decoded, request, callback) {
    // decoded contains info about token but not payload
    // custom validation
    callback(null, true);
  }

  // create a strategy named jwt-strategy
  // 'try' means authentication will be attempted, but not required to see the page
  server.auth.strategy('jwt-strategy', 'jwt', 'try', {
    key: process.env.JWT_SECRET,
    validateFunc: jwtValidate,
    verifyOptions: {
      algorithms: ['HS256'] // pick a strong algorithm
    }
  });

  server.views({
    engines: {
      hbs: handlebars
    },
    relativeTo: path.join(__dirname, 'views'),
    path: '.',
    helpersPath: './helpers',
    partialsPath: './partials',
    layoutPath: './layout',
    layout: 'default'
  });

  server.route(routes);
});

module.exports = server;
