var fs = require('fs');
var path = require('path');
const connPool = require('./db_connection.js');

var headers = {
    'html' : {'content-type' : 'text/html'},
    'css' : {'content-type' : 'text/css'},
    'js' : {'content-type' : 'application/javascript'},
    'json':{'content-type' : 'application/json'}
}

var handlers = {};

handlers.public = function(req, res) {

}

handlers.addBook = function(req, res) {

}

handlers.addReservation = function(req, res) {

}

handlers.getBooks = function(req, res) {
    //connect to the db
    // make query to get all the books
    connPool.query("SELECT * FROM books", function(err,results) {
        if (err) {
            res.writehead(500, headers.plain);
            res.end('err with database query');
        }
        else {
            res.writehead(200,headers.json);
            res.end(JSON.stringify(results.rows));
        }
    });
}

handlers.notFound = function(req, res) {
    res.writeHead(404, null);
    res.end('Resource not found');
}

module.exports = handlers;
