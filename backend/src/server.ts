import express from 'express';
import cors from 'cors';
import Logger from './utils/logger';
import bodyParser from 'body-parser';
import { Server as HttpServer } from 'http';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/index';

export const app = express();
const logger = Logger.child({ label: 'fig-it:api:db.ts' });

const http: HttpServer = new HttpServer(app);

app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

//
// --- ROUTE SETUP ----------------------------------------------------------------
//

app.use('/api', apiRoutes, (req) => {
    throw new Error(`API route ${req.path} could not be found`);
});


//
// --- SERVER SETUP ----------------------------------------------------------------
//

export default class Server {
    private port: number;

    private httpServer: HttpServer;

    constructor(port: number) {
        this.port = port;
        this.httpServer = null;
    }

    start(): Promise<void> {
        if(this.httpServer === null) {
            return new Promise((resolve: any, reject: any): void => {
                this.httpServer = http.listen(this.port, () => {
                    logger.info(`web server listening on port ${this.port}`);
                    logger.info(`Use prefix http://localhost:7777/api/v1`);
                    resolve();
                });

                this.httpServer.on('error', (err) => {
                    reject(err);
                });
            });
        }

        throw new Error(`web server already started on port ${this.port}`);
    }

    stop(): Promise<void> {
        return new Promise((resolve: any, reject: any): void => {
            if (this.httpServer !== null) {
                this.httpServer.close((err) => {
                    if (err) reject(err);
                    else resolve();
                });
            } else {
                resolve();
            }
        });
    }
}