import { StatusCodes } from "http-status-codes";
import HashtagRepository from "../repository/hashtag-repository.js";
import UserRepository from "../repository/user-repository.js";
import AppError from "../utils/errors/App-Error.js";

class UserService{
    constructor(){
        this.UserRepository = new UserRepository();
    }
    
    async signUp(data){
       try{
        const User = this.UserRepository.create(data);
        return User;

       }
       catch (error) {
        console.log(error)
        throw new AppError('Cannot create new User', StatusCodes.INTERNAL_SERVER_ERROR);
        
       }


    }


async signIn(UserId){
    

    try {
        const User = await this.UserRepository.get({_id: UserId});
        
        return User[0]; // get() returns an array, so get the first element
        
    
    } catch (error) {
        console.log(error)
        if( error instanceof AppError){
            throw error
        }
        throw new AppError('Cannot fetch User', StatusCodes.INTERNAL_SERVER_ERROR);
        
        
    }
    

}
}

export default UserService;