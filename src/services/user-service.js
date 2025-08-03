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


async signIn(data){
    try {
        const email = data.email
        const currentPassword = data.password;
        const userArray = await this.UserRepository.getUserByEmail(email);
        if(!userArray || userArray.length === 0){
            throw new AppError('User not found', StatusCodes.BAD_REQUEST)
        }
        const user = userArray[0];
        
        if(!user.comparePassword(currentPassword)){
            throw new AppError('Incorrect Password', StatusCodes.BAD_REQUEST)
        }
        return user;

    } catch (error) {
        console.log(error)
        if( error instanceof AppError){
            throw error
        }
        throw new AppError('Cannot SignIn', StatusCodes.INTERNAL_SERVER_ERROR);    
    }
}
}




export default UserService;