module.exports = {
  method: 'GET',
  path: '/users',
  handler: (request, reply) => {
    reply('users page');
  }
};
