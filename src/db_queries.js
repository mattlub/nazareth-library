dbQueries = {};

dbQueries.insertBook = function (connPool, parsedData, callback) {
    connPool.query(
        'INSERT INTO books (title, author, owner, summary) VALUES ($1, $2, $3, $4)',
        [parsedData.title, parsedData.author, parsedData.owner, parsedData.summary],
        callback
    );
}

module.exports = dbQueries;
