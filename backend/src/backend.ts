import Server from './server';
import Database from './db';
import { parseOrDefault } from './utils/backend.utils';


export const DEFAULT_API_PORT = 3001;

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
            console.log('Could not initialize DB, exiting..', err);
            return;
        }

        try {
            await this.server.start();
        } catch (err) {
            console.log(`Could not start webserver -- Reason: ${err.message}`);
        }
    }

    async stop(): Promise<void> {
        console.log('Stopping Fig-It, exiting...');
        try{
            await this.server.stop();
        } catch (err) {
            console.log('', err);
        }
        try {
            await this.db.close();
        } catch (err) {
            console.log('', err);
        }
    }
}

export default Backend;