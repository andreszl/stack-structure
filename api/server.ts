import express, { Application } from 'express';
import http  from 'http';
import config from 'config'
import  morgan  from "morgan";
import cors from "cors";

import usersRoutes from './routes/usersRoutes';
import Socket from './socket'
import * as uni from './app'


class Server{
    public app: Application;
    public server: any;
    public port: any;
    public socket: any

    constructor(){
        this.port = config.get('express.port')
        this.app = express();
        this.server = http.createServer(this.app); 
        this.socket = new Socket(this.server) 
        this.config();
        this.routes();   
    }

    config(): void {
        this.app.set('port', this.port || 3000);
        this.app.use(express.static(config.get('public')));
        this.app.set('views', config.get('public'))
        this.app.set('view engine', 'ejs')
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    

    routes(): void {
        this.app.use('/api/users', usersRoutes); 
        this.app.get('*', (uni.handleRender));
    }

    start(): void {      
        this.server.listen(this.app.get('port'), () => {
            console.log(`Server listening on port ${this.port}`)
        });        
    }
}



let server = new Server();
server.start();

