import db from "../data/db.conn";

class UserModel {
    public _id : string;
    public name : string;
    public role : string;
    public status : string;

    constructor(user: any) {
        this._id = user._id;
        this.name = user.name;
        this.role = user.role;
        this.status = user.status;
      }


    public static index(callback){
        db.users.find({}, (err, data) => {
            if(err){
                console.log(err)
            }
            callback(data)
        })
    }

    public static findUserByName(name){
        return new Promise(resolve => {
            db.users.find({name: name}, (err, user) => {
                resolve(user)
            })
        })
    }

    public static findUsersByName(name){
        let regex : any = `${name}`;
        regex = new RegExp(regex);
        return new Promise(resolve => {
            db.users.find({name: {$regex : regex}}, (err, user) => {
                console.log(user)
                resolve(user)
            })
        })
    }


    public static save(user: Object){
        return new Promise(resolve => {
            db.users.insert(user, (err, user) => {
                if(err){
                    throw err
                }
                resolve(user)
            })
        })       
    }

    public static find(){
        return new Promise(resolve => {
            db.users.find({}, (err, users) =>{
                resolve(users)
            })
        })
    }

    public static findById(id){
        return new Promise(resolve => {
            db.users.find({_id: id}, (err, user) => {
                resolve(user)
            })
        })
    }
}

export default UserModel

// db.find({ name: {$in :'andreszl'}})