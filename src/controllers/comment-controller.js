import { createComment,deleteComment } from "../services/comment-service.js";
import { StatusCodes } from "http-status-codes";
import {SuccessResponse, ErrorResponse} from "../utils/common/index.js";
import error from "../utils/common/error-response.js";


async function addComment(req , res){
    try {
        const comment = await createComment({
            content:req.body.content,
            modelType:req.body.modelType,
            userId:req.body.user,
            modelId:req.body.modelId
        })

        SuccessResponse.data = comment;
        SuccessResponse.message = 'Successfully added the comment';
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



async function delComment(req , res){
    try {
        if(req.body == undefined || !("commentId" in req.body)){
            ErrorResponse.message = "Body must contain commentId"
            

        }
        const comment = await deleteComment({
            _id:req.body.commentId,
        })
        if(comment.deletedCount == 0){
            SuccessResponse.message = 'Comment already deleted';
            SuccessResponse.status = StatusCodes.BAD_REQUEST
        }
        else{
            SuccessResponse.data = comment;
            SuccessResponse.message = 'Successfully deleted the comment';
            SuccessResponse.status = StatusCodes.OK

        }

        
        return res
                  .status(SuccessResponse.status)
                  .json(SuccessResponse)
        
        
        
    } catch (error) {
        ErrorResponse.error = error;  
        return res
                 .status(StatusCodes.INTERNAL_SERVER_ERROR)
                 .json(ErrorResponse)

        
    }

}



export {addComment, delComment} 