const connPool = require('../../database/db_connection.js');
const dbQueries = require('../db_queries.js');

module.exports = {
  method: 'post',
  path: '/add-book',
  handler: (request, reply) => {
    const data = request.payload;
    dbQueries.insertBook(connPool, data, (err) => {
      if (err) {
        return reply(err);
      }
      return reply.redirect('/');
    });
  }
};
