module.exports = {
  method: 'GET',
  path: '/users/{user_id}',
  handler: (request, reply) => {
    reply(`user page for user with id ${request.params.user_id}`);
    // dbQueries.getUserInfo(user_id, (err, results) => {
    //   const context = {
    //
    //   };
    //   reply.view('user_detail', context);
    //
    // })
  }
};
