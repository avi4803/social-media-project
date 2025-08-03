import mongoose, { mongo } from "mongoose";
import {ObjectId} from "bson"
import isEmail from "validator/lib/isEmail";


const userSchema =  new mongoose.Schema({
    email: {
        validate: [isEmail, 'Invalid Email'],
        required: true,
        unique:true
    } ,
    password:{
        type: String,
        required:true,
    },
    bio: {
        type: Number, 
    },
    tweets:[
        {
        type: mongoose.Schema.Types.ObjectId
        }
    ]
   

})


const User = mongoose.model('User', userSchema);

export default User;