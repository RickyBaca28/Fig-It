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

import yargs from 'yargs';
import Backend from './backend';
// import Backend from './backend';

const { argv } = yargs.options({ 
a: { alias: 'api-port', type: 'number', desc: 'Port to start the API server on' },
d: { alias: 'db-url', type: 'string', desc: 'Mongo database url' },
});

//
// --- SET UP BACKEND ----------------------------------------------------------------
//

require('dotenv').config();

const backend = new Backend(
  argv.a,
  argv.d,
);

//
// --- START UP ----------------------------------------------------------------------
//

backend.start();

//
// --- EXIT CLEAN UP -----------------------------------------------------------------
//

process.on(
  'SIGINT',
  async (): Promise<void> => {
    console.log('Received SIGINT from system');
    try {
      await backend.stop();
    } catch (err) {
      console.log(`${err.message}`);
    }
    process.exit();
  },
);

process.on(
  'SIGTERM',
  async (): Promise<void> => {
    console.log('Received SIGTERM from system');
    try {
      await backend.stop();
    } catch (err) {
      console.log(`${err.message}`);
    }
    console.log('nodemon restart...');
      process.exit();
  },
);