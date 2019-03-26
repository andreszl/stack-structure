import {Schema,model} from 'mongoose'

const userSchema = new Schema ({
    userName : String,
    name: {type: String, required: true ,lowercase: true},
    lastname: {type: String , required: true, lowercase: true},
    email : { type: String , required: true, unique: true},
    image : String,
    password: String,
    nameCompany:{type:String, lowercase: true} ,
    createdAt: {type : Date, default : Date.now},
    updateAt: Date,
})

export default model('User',userSchema)