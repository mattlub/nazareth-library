var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var connPool = require('../database/db_connection.js');
var db = require('./db_queries.js');

var headers = {
    'plain' : {'content-type' : 'text/plain'},
    'html' : {'content-type' : 'text/html'},
    'css' : {'content-type' : 'text/css'},
    'js' : {'content-type' : 'application/javascript'},
    'json' : {'content-type' : 'application/json'}
}

var handlers = {};

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
                res.end('err inserting books on db');
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
            res.end('err with database query');
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
