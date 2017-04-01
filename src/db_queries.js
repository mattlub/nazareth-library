dbQueries = {};

dbQueries.getBooks = function(connPool, callback) {
    connPool.query('SELECT * FROM books', callback);
}

dbQueries.getBooksWithReservations = function(connPool, callback) {
  var sqlQuery =
  'SELECT books.id, books.title, books.author, books.owner, books.summary, reservations.id as reservation_id, reservations.name, reservations.from_date, reservations.to_date FROM books LEFT JOIN reservations ON books.id=reservations.book_id;';
  var booksWithReservations = {};
  connPool.query(sqlQuery, function(err, dbResult) {
    if (err) {
      return callback(err);
    }
    var results = dbResult.rows;
    results.forEach(function(result) {
      // add new books if not already there
      if (!booksWithReservations[result.id]) {
        var bookObj = {
          id: result.id,
          title: result.title,
          author: result.author,
          owner: result.owner,
          summary: result.summary,
          reservations: []
        };
        booksWithReservations[result.id] = bookObj;
      }
      // now add reservation if there
      if (result.reservation_id) {
        var reservationInfo = {
          id: result.reservation_id,
          name: result.name,
          from_date: result.from_date,
          to_date: result.to_date
        };
        booksWithReservations[result.id].reservations.push(reservationInfo);
      }
    });
    // convert to array
    var booksWithReservationsArr = [];
    for (var key in booksWithReservations) {
      booksWithReservationsArr.push(booksWithReservations[key]);
    }
    console.log(booksWithReservationsArr);
    callback(null, booksWithReservationsArr);
  });
}

dbQueries.insertBook = function(connPool, parsedData, callback) {
    connPool.query(
        'INSERT INTO books (title, author, owner, summary) VALUES ($1, $2, $3, $4)',
        [parsedData.title, parsedData.author, parsedData.owner, parsedData.summary],
        callback
    );
}

module.exports = dbQueries;
