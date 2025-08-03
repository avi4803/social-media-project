import { StatusCodes } from "http-status-codes";
import CommentRepository from "../repository/comment-repository.js";
import AppError from "../utils/errors/App-Error.js";

const commentRepository = new CommentRepository();

async function addComment(data){
    try {
        const comment = await commentRepository.create(data);
        return comment;

        
    } catch (error) {
        throw new AppError('Cannot add comment',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }


}


async function deleteComment(id){
    try {
        const comment = await commentRepository.delete(id);
        return comment;

        
    } catch (error) {
        throw new AppError('Cannot add comment',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }


}


export {addComment,deleteComment};
