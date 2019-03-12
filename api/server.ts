import express, { Application } from 'express';
import config from 'config'
import  morgan  from "morgan";
import cors from "cors";

import usersRoutes from './routes/usersRoutes';
import * as uni from './app'

import { ApolloServer, gql } from 'apollo-server-express';

import { modules } from './graphql';


const { schema, context } =  modules;

class Server{
    public app: Application;
    public server: any;
    public port: any;
    public socket: any
    public  path: String


    constructor(){
        this.path = config.get('graphql.path'); 
        this.port = config.get('express.port')
        this.app = express();
        this.server = new ApolloServer({ schema, context, introspection: true});
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
       this.server.applyMiddleware({ app: this.app, path: this.path });
       this.app.use('/api/users', usersRoutes); 
       this.app.get('*', (uni.handleRender));
    }

    start(): void {            
      this.app.listen(this.app.get('port'), () =>
        console.log(`🚀 Server ready at http://localhost:${this.app.get('port')}`)
      )
    }
}

let server = new Server();
server.start();

