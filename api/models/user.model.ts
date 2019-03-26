 import Database from '../database/database';

class UserModel {

    public static async getAlluser(){
        try {
            let db = await new Database().conect();
            // return db.collection('users').find({}).toArray();
            
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserModel;