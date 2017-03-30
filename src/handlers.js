const fs = require('fs');
const path = require('path');
const connPool = require('../database/db_connection.js');

const headers = {
    'plain' : {'content-type' : 'text/plain'},
    'html' : {'content-type' : 'text/html'},
    'css' : {'content-type' : 'text/css'},
    'js' : {'content-type' : 'application/javascript'},
    'json' : {'content-type' : 'application/json'}
}

const handlers = {};

handlers.public = function(req, res) {

}

handlers.addBook = function(req, res) {
    // connect to the db
    // make query to add new book into books table
    var body = [];
    request.on('data', function(chunk) {
      body.push(chunk);
    })

    request.on('end', function() {
      body = Buffer.concat(body).toString();
      // at this point, `body` has the entire request body stored in it as a string
    });

    connPool.query(
        'INSERT INTO books (title, author, owner, summary) VALUES ($1,$2,$3,$4)',
        [body.title,body.author,body.owner,body.summary],
        function(err, results) {
            if (err) {
                res.writehead(500, headers.plain);
                res.end('err inserting books on db');
            }
            else {
                res.writehead(303, {'location': '/add.html'});
                res.end();
            }
        }
    );
}

handlers.addReservation = function(req, res) {

}

handlers.getBooks = function(req, res) {
    //connect to the db
    // make query to get all the books
    connPool.query('SELECT * FROM books', function(err, results) {
        if (err) {
            res.writehead(500, headers.plain);
            res.end('err with database query');
        }
        else {
            res.writehead(200, headers.json);
            res.end(JSON.stringify(results.rows));
        }
    });
}

handlers.notFound = function(req, res) {
    res.writeHead(404, null);
    res.end('Resource not found');
}

module.exports = handlers;
