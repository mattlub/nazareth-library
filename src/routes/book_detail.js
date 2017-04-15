module.exports = {
  method: 'GET',
  path: '/books/{id}',
  handler: (request, reply) => {
    reply(`page for book with id ${request.params.id}`);
    // dbQueries.getUserInfo(username, (err, results) => {
    //   const context = {
    //
    //   };
    //   reply.view('user_detail', context);
    //
    // })
  }
};
