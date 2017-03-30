var fs = require('fs');
var path = require('path');

var headers = {
    'html' : {'content-type' : 'text/html'},
    'css' : {'content-type' : 'text/css'},
    'js' : {'content-type' : 'text/javascript'}
}

var handlers = {};

handlers.public = function(req, res) {
    var fileType = req.url.split('.')[1];
    res.writeHead(200, headers[fileType] || headers['html']);

    var fileName = '';
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
        res.end(file);
    });
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
