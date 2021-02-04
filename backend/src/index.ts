import yargs from 'yargs';
import Logger from './utils/logger';
import Backend from './backend';

const logger = Logger.child({ label: 'fig-it:api:db.ts' });
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
    logger.info('Received SIGINT from system');
    try {
      await backend.stop();
    } catch (err) {
      logger.info(`${err.message}`);
    }
    process.exit();
  },
);

process.on(
  'SIGTERM',
  async (): Promise<void> => {
    logger.info('Received SIGTERM from system');
    try {
      await backend.stop();
    } catch (err) {
      logger.info(`${err.message}`);
    }
    logger.info('nodemon restart...');
      process.exit();
  },
);