import db from "../data/db.conn";

class TechnicalService{
     public getUsers(): any{
        return new Promise(function(resolve, reject){
            db.users.find({}, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            })
         })
    }

    public findByName(name){
        return new Promise(function(resolve, reject){
            db.users.find({name}, (err, doc) => {
               let user = doc[0]
                if (err) {
                    reject(err);
                }else if(user === undefined) {
                    db.users.insert({name: name, status: false}, (err, user) => {
                        if(err){
                            reject(err)
                        }else{                          
                            resolve(user)
                        }                        
                    })
                }else{
                    resolve(user);

                }
            })
        })
    }

    public changeStatus(id: string, status: boolean){
        db.users.update({ _id: id }, { $set : {status: status} }, {}, function (err, numReplaced) {
            if(err){
                console.log(err)
            }
            console.log(numReplaced)
        });    
    }

}

export default TechnicalService