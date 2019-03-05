import db from "../data/db.conn";

class UserModel {
    public static index(callback){
        db.users.find({}, (err, data) => {
            if(err){
                console.log(err)
            }
            callback(data)
        })
    }

    public static findByName(name, callback){
        db.users.find({name: name}, (err, user) => {
            callback(user)
        })
    }
    public static save(user: Object, callback: Function){
        db.users.insert(user, (err, user) => {
            if(err){
                throw err
            }
           callback(user)
        })
    }

    public static findById(id: string, callback: Function){
        db.users.find({_id: id}, (err, user) => {
            if(err){
                throw err
            }
           callback(user)
        })
    }
}

export default UserModel