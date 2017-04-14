const path = require('path');

const connPool = require('../database/db_connection.js');
const dbQueries = require('./db_queries.js');

const staticFiles = {
  method: 'GET',
  path: '/{file*}',
  handler: {
    directory: {
      path: path.join(__dirname, '../public')
    }
  }
};

const home = {
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

const add = {
  method: 'GET',
  path: '/add',
  handler: (request, reply) => {
    // get books
    const context = {

    };
    reply.view('add', context);
  }
};

module.exports = [
  staticFiles,
  home,
  add
]
