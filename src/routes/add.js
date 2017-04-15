module.exports = {
  method: 'GET',
  path: '/add',
  handler: (request, reply) => {
    const templateContext = {
      base_url: process.env.BASE_URL,
      // auth info
      isAuthenticated: request.auth.isAuthenticated,
      auth_user_id: request.auth.credentials ? request.auth.credentials.id : null,
      auth_username: request.auth.credentials ? request.auth.credentials.username : null,
      auth_avatar_url: request.auth.credentials ? request.auth.credentials.avatar_url : null
    };
    reply.view('add', templateContext);
  }
};
