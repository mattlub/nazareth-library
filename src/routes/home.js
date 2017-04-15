const connPool = require('../../database/db_connection.js');
const dbQueries = require('../db_queries.js');

module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    // get books
    dbQueries.getBooksWithReservations(connPool, (error, result) => {
      if (error) {
        reply.redirect('./error');
      }
      const templateContext = {
        // auth info
        isAuthenticated: request.auth.isAuthenticated,
        user_id: request.auth.credentials ? request.auth.credentials.id : null,
        username: request.auth.credentials ? request.auth.credentials.username : null,
        avatar_url: request.auth.credentials ? request.auth.credentials.avatar_url : null,
        // data
        // TODO decide ordering, max num to display
        books: result,
      };
      reply.view('list', templateContext);
    })
  }
};