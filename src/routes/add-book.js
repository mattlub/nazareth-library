const dbQueries = require('../db_queries.js');

module.exports = {
  method: 'post',
  path: '/add-book',
  config: {
    auth: {
      strategy: 'jwt-strategy',
      mode: 'required'
    }
  },
  handler: (request, reply) => {
    // owner_id is taken from the login credentials
    // request.auth.credentials contains id, username, location, avatar_url
    const owner_id = request.auth.credentials.id;
    const bookData = Object.assign({},
      request.payload,
      {owner_id: owner_id}
    );
    console.log('trying to add book:');
    console.log(bookData);
    dbQueries.insertBook(bookData, (err) => {
      if (err) {
        console.log('error inserting book.');
        return reply(err);
      }
      console.log('successfully inserted book');
      return reply.redirect('/');
    });
  }
};
