var handlers = require('./handlers.js');

var routes = {
    '/' : handlers.public,
    '/index.js' : handlers.public,
    '/main.css' : handlers.public,
    '404' : handlers.notFound
}

module.exports = function(req, res) {
    if (routes[req.url]) {
        routes(req.url)(req, res);
    } else {
        routes[404](req, res);
    }
}
