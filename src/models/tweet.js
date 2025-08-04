import mongoose from "mongoose";
import {ObjectId} from "bson"


const tweetSchema =  new mongoose.Schema({
    content: {
        type: String
    } ,
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
    }],
    noOfRetweets: {
        type: Number,
        default: 0 
    },
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],


})


const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;