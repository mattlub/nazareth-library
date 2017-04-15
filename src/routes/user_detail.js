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
      const context = Object.assign(userInfo, {
        base_url: process.env.BASE_URL
      });
      reply.view('user_detail', context);
    })
  }
};
