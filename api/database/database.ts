import  {MongoClient, Db} from 'mongodb';

class Database {
    private host : string;
    private port  : number;
    private dbname : string;
    private connection ?: MongoClient;
    private db ?: Db;

    constructor(){
        this.host = 'localhost';
        this.port = 27017;
        this.dbname = 'fingit-client';
      }

    public getDabase(){
        try {   
            if(this.connection === undefined){
                this.conect();  
            }
            return this.connection;

        } catch (error) {
            console.log(`Error get database ${error}`)
        }        
     }

    public async conect(){
        try{  
            this.connection = await MongoClient.connect(`mongodb://${this.host}:${this.port}`,{useNewUrlParser:true});
            
              this.db = this.connection.db(this.dbname); 
        }catch(error){
            console.log(`Error in connect database ${error}`);
        }
    }


    public disconnet(){
        try{   
          if(this.connection != undefined){
               this.connection.close();
          }
        }catch(error){
            console.log(`Error in desconnect database ${error}`);
        }
    }
}

export default Database;