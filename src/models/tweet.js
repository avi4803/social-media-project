import mongoose from "mongoose";
import {ObjectId} from "bson"


const tweetSchema =  new mongoose.Schema({
    content: {
        type: String
    } ,
    noOfLikes:{
        type: Number,
        default: 0
    },
    noOfRetweets: {
        type: Number,
        default: 0 
    },
    comment: {
        type: String,
      
    },


})


const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;