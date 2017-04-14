const tape = require('tape');
const server = require('../../src/server.js');

tape('check the home route', (t) => {
  const options = {
    url: '/',
    method: 'GET'
  };
  server.inject(options, (res) => {
    const testString = '<title>Nazareth Library</title>';
    t.equal(res.statusCode, 200, 'status code should be 200');
    t.ok(res.payload.includes(testString), 'served html should contain the right title');
    t.end();
  });
});

tape('check static files are served', (t) => {
  const options = {
    url: '/main.css',
    method: 'GET'
  };
  server.inject(options, (res) => {
    const testString = 'body {';
    t.equal(res.statusCode, 200, 'status code should be 200');
    t.ok(res.payload.includes(testString), 'served css should contain "body {"');
    t.end();
  });
});

tape.onFinish(() => process.exit(0));
