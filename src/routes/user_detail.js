module.exports = {
  method: 'GET',
  path: '/users/{username}',
  handler: (request, reply) => {
    reply(`user page for user with name ${request.params.username}`);
    // dbQueries.getUserInfo(username, (err, results) => {
    //   const context = {
    //
    //   };
    //   reply.view('user_detail', context);
    //
    // })
  }
};
