var fs = require('fs');
var path = require('path');

var headers = {
    'html' : {'content-type' : 'text/html'},
    'css' : {'content-type' : 'text/css'},
    'js' : {'content-type' : 'text/javascript'}
}

var handlers = {};

handlers.public = function(req, res) {

}

handlers.addBook = function(req, res) {

}

handlers.addReservation = function(req, res) {

}

handlers.getBooks = function(req, res) {

}

handlers.notFound = function(req, res) {
    res.writeHead(404, null);
    res.end('Resource not found');
}

module.exports = handlers;
