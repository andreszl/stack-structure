import mongoose from 'mongoose';

class Database {
    private server : String;
    private database : String;
  
  constructor() {
     this.server = 'localhost';
     this.database = 'fingit-client';
  }

   async connect() {
      try {
         const connect =  await mongoose.connect(`mongodb://${this.server}/${this.database}`,{useNewUrlParser:true, useCreateIndex:true,});
         console.log(` Database connection successful ${connect.connection.db} `);
        } catch (error) {
         console.error('Database connection error');
        }
   }

   async disconect(){
     try {
        const disconect = await  mongoose.disconnect();
        console.log(`database desconect  ${disconect}`);
     } catch (error) {
       console.error('Error desconect database');
     }
   }
}

export default Database;