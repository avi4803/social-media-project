import mongoose, { mongo } from "mongoose";
import {ObjectId} from "bson"
import bcrypt from 'bcrypt';


const userSchema =  new mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique:true
    } ,
    password:{
        type: String,
        required:true,
    },
    name:{
        type: String,
        required:true,
    },
    bio: {
        type: String,
        maxlength: 280 
    },
    tweets:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Tweet'
        }
    ]
   

})

//encrypting password before storing
userSchema.pre('save' , function(next){
    const user = this;
    const salt = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, salt);
    user.password = encryptedPassword;
    next();
})


const User = mongoose.model('User', userSchema);

export default User;