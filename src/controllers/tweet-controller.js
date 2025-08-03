import TweetService from "../services/tweet-service.js";
import { StatusCodes } from "http-status-codes";
import {SuccessResponse, ErrorResponse} from "../utils/common/index.js";

const tweetService = new TweetService();

async function createTweet(req , res){
   
    try {
        const tweet = await tweetService.create({
            content: req.body.content,
            

        })
        SuccessResponse.data = tweet;
        SuccessResponse.message = 'Successfully created the tweet';
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse)
        
        
        
    } catch (error) {
        ErrorResponse.error = error;  
        return res
                 .status(StatusCodes.INTERNAL_SERVER_ERROR)
                 .json(ErrorResponse.error)

        
    }

}


async function getTweet(req , res){
    try {
        const tweet = await tweetService.getTweet({
            _id: req.params.id,
            

        })
        SuccessResponse.data = tweet;
        SuccessResponse.message = 'Successfully fecthed the tweet';
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse)
        
        
        
    } catch (error) {
        ErrorResponse.error = error;  
        return res
                 .status(StatusCodes.INTERNAL_SERVER_ERROR)
                 .json(ErrorResponse.error)

        
    }

}

export {createTweet,getTweet};