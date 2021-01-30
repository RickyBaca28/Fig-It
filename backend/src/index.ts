// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end(`Fig-It's backend!`);
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const yargs = require('yargs/yargs')

const { argv } = yargs.options({ 
a: { alias: 'api-port', type: 'number', desc: 'Port to start the API server on' },
d: { alias: 'db-url', type: 'string', desc: 'Mongo database url' },
});

//
// --- SET UP BACKEND ----------------------------------------------------------------
//

require('dotenv').config();

