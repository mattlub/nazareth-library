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
    var fileName;
    if (req.url === '/') {
        fileName = 'list.html';
    } else  {
        fileName = req.url.slice(1);
    }

    var filePath = path.join(__dirname, '..', 'public', fileName);
    fs.readFile(filePath, function(error, file) {
        if (error) {
            res.writeHead(500, headers.plain);
            res.end('Something went wrong when reading this file: ', fileName);
        }

        var fileType = req.url.split('.')[1];
        res.writeHead(200, headers[fileType] || headers['html']);
        res.end(file);
    });
}

handlers.addBook = function(req, res) {
//connect to the db
// make query to add new book into books table

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
