module.exports = {
  method: 'GET',
  path: '/add',
  handler: (request, reply) => {
    const templateContext = {
      // auth info
      isAuthenticated: request.auth.isAuthenticated,
      user_id: request.auth.credentials ? request.auth.credentials.id : null,
      username: request.auth.credentials ? request.auth.credentials.username : null,
      avatar_url: request.auth.credentials ? request.auth.credentials.avatar_url : null
    };
    reply.view('add', templateContext);
  }
};
