module.exports = [
  // static files
  require('./routes/static'),
  // views
  require('./routes/home'),
  require('./routes/add'),
  require('./routes/users'),
  require('./routes/user_detail'),
  require('./routes/book_detail'),
  // post request routes
  require('./routes/add-book'),
  require('./routes/add-reservation'),
  // auth routes
  require('./routes/login'),
  require('./routes/welcome'),
  // error
  require('./routes/error')
]
