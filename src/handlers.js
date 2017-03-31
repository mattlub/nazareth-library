const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const connPool = require('../database/db_connection.js');
const db = require('./db_queries.js');

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
    fs.readFile(filePath, function(err, file) {
        if (err) {
            res.writeHead(500, headers.plain);
            res.end('Something went wrong when reading a file: ', err);
        }

        var fileType = req.url.split('.')[1];
        res.writeHead(200, headers[fileType] || headers['html']);
        res.end(file);
    });
}

handlers.addBook = function(req, res) {
    var body = [];
    req.on('data', function(chunk) {
        body.push(chunk);
    })
    req.on('end', function() {
        body = Buffer.concat(body).toString();
        var parsedData = querystring.parse(body);

        db.insertBook(connPool, parsedData, function(err, results) {
            if (err) {
                res.writeHead(500, headers.plain);
                res.end('Something went wrong when adding a book to the database: ', err);
            }
            else {
                res.writeHead(303, {'location': '/add.html'});
                res.end();
            }
        })

    });
}

handlers.addReservation = function(req, res) {

}

handlers.getBooks = function(req, res) {
    db.getBooks(connPool, function(err, results) {
        if (err) {
            res.writeHead(500, headers.plain);
            res.end('Something went wrong when requesting books from the database: ', err);
        }
        else {
            res.writeHead(200, headers.json);
            res.end(JSON.stringify(results.rows));
        }
    });
}

handlers.notFound = function(req, res) {
    res.writeHead(404, null);
    res.end('Resource not found');
}

module.exports = handlers;
