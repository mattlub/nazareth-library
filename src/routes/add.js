module.exports = {
  method: 'GET',
  path: '/add',
  handler: (request, reply) => {
    const context = {

    };
    reply.view('add', context);
  }
};
