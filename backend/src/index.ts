import yargs from 'yargs';
import Backend from './backend';

const { argv } = yargs.options({ 
a: { alias: 'api-port', type: 'number', desc: 'Port to start the API server on' },
d: { alias: 'db-url', type: 'string', desc: 'Mongo database url' },
});

//
// --- SET UP BACKEND ----------------------------------------------------------------
//

require('dotenv').config();

const backend = new Backend(
  argv.a ?? process.env.API_PORT,
  argv.d?? process.env.DB_URL,
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