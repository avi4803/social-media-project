import UserService from "../services/user-service.js";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse , SuccessResponse } from "../utils/common/index.js";

const userService = new UserService();

async function signUp(req , res){
   
    try {
        const user = await userService.signUp({
            email: req.body.email,
            password: req.body.password,
            name:req.body.name,

        })
        SuccessResponse.data = user;
        SuccessResponse.message = 'Successfully created the user';
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


async function signIn(req, res) {
    try {
        const user = await userService.signIn({
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.message = "User signed In"
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error = error;  
        return res
                 .status(StatusCodes.INTERNAL_SERVER_ERROR)
                 .json(ErrorResponse.error)
        
    }
    
}


export { signUp , signIn }