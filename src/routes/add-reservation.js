const connPool = require('../../database/db_connection.js');
const dbQueries = require('../db_queries.js');

module.exports = {
  method: 'post',
  path: '/add-reservation',
  config: {
    auth: {
      strategy: 'jwt-strategy',
      mode: 'required'
    }
  },
  handler: (request, reply) => {
    // request.payload should include book_id, from_date, to_date
    const user_id = request.auth.credentials.id;
    const reservationData = Object.assign({},
      JSON.parse(request.payload),
      { user_id: user_id }
    );
    console.log('trying to insert reservation.');
    dbQueries.insertReservation(reservationData, (err) => {
      if (err) {
        return reply(err);
      }
      console.log('successfully inserted reservation.');
      return reply.redirect('/');
    });
  }
};
