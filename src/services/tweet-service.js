import { StatusCodes } from "http-status-codes";
import HashtagRepository from "../repository/hashtag-repository.js";
import TweetRepository from "../repository/tweet-repository.js";
import AppError from "../utils/errors/App-Error.js";

class TweetService{
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }
    
    async create(data){
       try {
        console.log(data)

       const content = data.content;
       const tags = content.match(/#[a-zA-Z0-9_]{1,}/g).
       map((tag) => tag.substring(1).toLowerCase());

       //storing a tweet
       const tweet = await this.tweetRepository.create({
        content:data.content
       });

       let alreadyPresentTags = await this.hashtagRepository.getHashtagByName(tags);
       let textOfPresentTags = alreadyPresentTags.map(tags => tags.text);
       let newTags = tags.filter(tag => !textOfPresentTags.includes(tag));
       newTags = newTags.map( tag => {
        return{
            text: tag,
            tweets:[tweet.id],
        }
       })
       await this.hashtagRepository.bulkCreate(newTags);
       alreadyPresentTags.forEach((tag) => {
        tag.tweets.push(tweet.id);
        tag.save();
       })
       return tweet;
        
       } catch (error) {
        console.log(error)
        throw new AppError('Cannot create new Tweet', StatusCodes.INTERNAL_SERVER_ERROR);
        
       }


    }


async getTweet(tweetId){
    

    try {
        const tweet = await this.tweetRepository.get({_id: tweetId});
        
        return tweet[0]; // get() returns an array, so get the first element
        
    
    } catch (error) {
        console.log(error)
        if( error instanceof AppError){
            throw error
        }
        throw new AppError('Cannot fetch tweet', StatusCodes.INTERNAL_SERVER_ERROR);
        
        
    }
    

}
}

export default TweetService;