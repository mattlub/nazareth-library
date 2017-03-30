const fs = require('fs');
const dbConn = require('./db_connection.js');

const sql = fs.readFileSync(__dirname + '/db_build.sql').toString();

dbConn.query(sql,function(err, result) {
    if (err) throw err;
    console.log('Successfully created table! Woo!');
});
