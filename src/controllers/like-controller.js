import LikeService from "../services/like-service.js";
import { StatusCodes } from "http-status-codes";
import {SuccessResponse, ErrorResponse} from "../utils/common/index.js";
import AppError from "../utils/errors/App-Error.js";
const likeService = new LikeService();

async function toggleLike(req , res){
    try {
        const like = await likeService.toggleLike({
            modelId:req.body.modelId,
            modelType:req.body.modelType,
            userId:req.body.user,

        }
        )
        SuccessResponse.data = like;
        if(like){
            SuccessResponse.message = 'Successfully added the like';

        }
        else{
            SuccessResponse.message = 'Successfully removed the like';
        }
        
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



export {toggleLike} 