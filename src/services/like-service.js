import { StatusCodes } from "http-status-codes";
import LikeRepository from "../repository/like-repository.js";
import TweetRepository from "../repository/tweet-repository.js";
import CommentRepository from "../repository/comment-repository.js";
import AppError from "../utils/errors/App-Error.js";

class LikeService{
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.likeRepository = new LikeRepository();
        this.commentRepository = new CommentRepository();
    }

    async toggleLike(data){
        try {
        let likeable
        
        if(data.modelType === 'Tweet'){
           const result = await this.tweetRepository.get({_id: data.modelId});
           likeable = result[0];
           
        }
        else if(data.modelType === 'Comment'){
           const result = await this.commentRepository.get({_id: data.modelId});
           likeable = result[0];
            

        }
        else{
            console.log('wrong modelType');
            throw new AppError('Wrong modelType', StatusCodes.BAD_REQUEST)
        }

        const exists = await this.likeRepository.findByUserAndLikeable({
            user:data.userId,
            onModel: data.modelType,
            likeable: data.modelId
        })

        let isLiked;
        
        if(exists){
            await this.likeRepository.delete(exists._id);
            likeable.likes.pull(exists._id);
            await likeable.save();
            isLiked = false;
            

        }
        else{
            const newLike = await this.likeRepository.create({
                user:data.userId,
                onModel: data.modelType,
                likeable: data.modelId

            })
            likeable.likes.push(newLike);
            await likeable.save();
            isLiked = true;

            }
        return isLiked;
            
        } catch (error) {
            throw error
            // throw new AppError('Something went wrong in like service',StatusCodes.INTERNAL_SERVER_ERROR)
            
        }
        }
    }


    export default LikeService;
