const connPool = require('../../database/db_connection.js');
const dbQueries = require('../db_queries.js');

module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    // get books
    dbQueries.getBooksWithReservations(connPool, (err, result) => {
      const context = {
        books: result
      };
      reply.view('list', context);
    })
  }
};
