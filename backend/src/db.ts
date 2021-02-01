import mongoose, { Mongoose } from 'mongoose';

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
            console.log('Attempting to connect MongoDB!');
            console.log('dbUrl:', this.dbUrl);
            this.db = await mongoose.connect(this.dbUrl);
        } catch (err) {
            throw new Error('Unable to connect to mongo database, check to see if docker image is running');
        }
        console.log('Connected to MongoDB!');
    }

    async close(): Promise<void> {
        try {
            if(this.db) {
                await this.db.disconnect();
                console.log('Closed connection to MongoDB');
            }
        } catch (err) {
            console.log(`Can't close connection to MongoDB`);
        }
    }
}
export default Database;