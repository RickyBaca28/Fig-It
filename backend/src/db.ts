import mongoose, { Mongoose } from 'mongoose';
import Logger from './utils/logger';

const logger = Logger.child({ label: 'fig-it:api:db.ts' });

class Database {
    private db: Mongoose;

    private dbUrl: string;

    constructor(dbUrl: string ) {
        this.dbUrl = dbUrl;

        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useNewUrlParser', true);
    }

    async connect(): Promise<void> {
        try {
            logger.info('Attempting to connect MongoDB!');
            logger.info('dbUrl:', this.dbUrl);
            this.db = await mongoose.connect(this.dbUrl);
        } catch (err) {
            throw new Error('Unable to connect to mongo database, check to see if docker image is running');
        }
        logger.info('Connected to MongoDB!');
    }

    async close(): Promise<void> {
        try {
            if(this.db) {
                await this.db.disconnect();
                logger.info('Closed connection to MongoDB');
            }
        } catch (err) {
            logger.info(`Can't close connection to MongoDB`);
        }
    }
}
export default Database;