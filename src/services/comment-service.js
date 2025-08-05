import { StatusCodes } from "http-status-codes";
import CommentRepository from "../repository/comment-repository.js";
import AppError from "../utils/errors/App-Error.js";
import TweetRepository from "../repository/tweet-repository.js";

const commentRepository = new CommentRepository();
const tweetRepository = new TweetRepository();

        

async function createComment(data){
    try {
        console.log(data)
        let commentable;
        if(data.modelType === 'Tweet'){
            const result = await tweetRepository.get({_id: data.modelId});
            commentable = result[0];
        }

        else if(data.modelType === 'Comment'){
            const result = await commentRepository.get({_id: data.modelId});
            commentable = result[0];
                    
        
        }
        else{
            console.log('wrong modelType');
            throw new AppError('Wrong modelType', StatusCodes.BAD_REQUEST)
        }

        const newComment = await commentRepository.create({
                content:data.content,
                user:data.userId,
                onModel: data.modelType,
                commentable: data.modelId

            })
            commentable.comment.push(newComment);
            await commentable.save();

        
    } catch (error) {
        console.log(error)
        throw new AppError('Cannot add comment',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }


}


async function deleteComment(id){
    try {
        
        const comment = await commentRepository.delete({_id:id});
        return comment;

        
    } catch (error) {
        if(error instanceof AppError){
            throw error;
        }
        throw new AppError('Cannot delete comment',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }


}


export {createComment,deleteComment};
