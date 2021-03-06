import Server from './server';
import Database from './db';
import Logger from './utils/logger';

import { parseOrDefault } from './utils/backend.utils';


export const DEFAULT_API_PORT = 3001;
const logger = Logger.child({ label: 'fig-it:api:backend.ts' });

class Backend {
    private server: Server;

    private db: Database;

    constructor(
        apiPort: string | number,
        dbUrl: string,
    ) {
        this.server = new Server(parseOrDefault(apiPort, DEFAULT_API_PORT));
        this.db = new Database(dbUrl);
    }

    async start(): Promise<void> {
        console.log(`
        ╭━━━╮╱╱╱╱╱╭━━┳╮
        ┃╭━━╯╱╱╱╱╱╰┫┣╯╰╮
        ┃╰━━┳┳━━╮╱╱┃┣╮╭╯
        ┃╭━━╋┫╭╮┣━━┫┃┃┃
        ┃┃╱╱┃┃╰╯┣━┳┫┣┫╰╮
        ╰╯╱╱╰┻━╮┃╱╰━━┻━╯
        ╱╱╱╱╱╭━╯┃
        ╱╱╱╱╱╰━━╯

        `);
        try {
            await this.db.connect();
        } catch (err) {
            logger.info('Could not initialize DB, exiting..', err);
            return;
        }

        try {
            await this.server.start();
        } catch (err) {
            logger.info(`Could not start webserver -- Reason: ${err.message}`);
        }
    }

    async stop(): Promise<void> {
        logger.info('Stopping Fig-It, exiting...');
        try{
            await this.server.stop();
        } catch (err) {
            logger.info('', err);
        }
        try {
            await this.db.close();
        } catch (err) {
            logger.info('', err);
        }
    }
}

export default Backend;