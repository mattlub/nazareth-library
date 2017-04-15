module.exports = {
  method: 'GET',
  path: '/users/{id}',
  handler: (request, reply) => {
    // TODO: change from id to username
    console.log(`getting user page for user with name ${request.params.id}`);
    dbQueries.getUserInfo(request.params.id, (err, results) => {
      console.log('result.rows of getUserInfo: ');
      console.log(results.rows);
      if (err) {
        return reply.redirect('/error');
      }
      if (!results || !results.rows || results.rows.length !== 1) {
        return reply.redirect('/error');
      }
      const userInfo = results.rows[0];
      // add auth info and base_url to context
      const context = Object.assign(userInfo, {
        isAuthenticated: request.auth.isAuthenticated,
        auth_user_id: request.auth.credentials ? request.auth.credentials.id : null,
        auth_username: request.auth.credentials ? request.auth.credentials.username : null,
        auth_avatar_url: request.auth.credentials ? request.auth.credentials.avatar_url : null,
        base_url: process.env.BASE_URL
      });
      reply.view('user_detail', context);
    })
  }
};
