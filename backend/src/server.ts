import express from 'express';
import { Server as HttpServer } from 'http';
import cookieParser from 'cookie-parser';

export const app = express();
const http: HttpServer = new HttpServer(app);

app.use(cookieParser());

//
// --- ROUTE SETUP ----------------------------------------------------------------
//

// api routes
app.get('/', function(req, res) {
    res.send('Hello World');
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
                    console.log(`web server listening on port ${this.port}`);
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