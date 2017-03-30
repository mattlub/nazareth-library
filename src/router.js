var handlers = require('./handlers.js');

var routes = {
    '/' : handlers.public,
    '/add.html' : handlers.public,
    '/list.html' : handlers.public,
    '/reserve.html' : handlers.public,
    '/index.js' : handlers.public,
    '/main.css' : handlers.public,
    '/get-books' : handlers.getBooks,
    '/add-book' : handlers.addBook,
    '/add-reservation' : handlers.addReservation,
    '404' : handlers.notFound
}

module.exports = function(req, res) {
    if (routes[req.url]) {
        routes[req.url](req, res);
    } else {
        routes[404](req, res);
    }
}
