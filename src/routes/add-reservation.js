const connPool = require('../../database/db_connection.js');
const dbQueries = require('../db_queries.js');

module.exports = {
  method: 'post',
  path: '/add-reservation',
  handler: (request, reply) => {
    const data = request.payload;
    reply('todo')
    // dbQueries.insertBook(connPool, data, (err) => {
    //   if (err) {
    //     return reply(err);
    //   }
    //   return reply.redirect('/');
    // });
  }
};
