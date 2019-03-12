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
        console.log('here')
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

    public static find(){
        return new Promise(resolve => {
            db.users.find({}, (err, user) =>{
                resolve(user)
            })
        })
    }

    public static findById(){
        return new Promise(resolve => {
            setTimeout(() => {
              resolve('resolved');
            }, 2000);
          });

        // function(resolve, reject){
        //     db.users.find({_id: id}, (err, user) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(user);
        //         }
        //     })
        //  }
        
    }
}

export default UserModel