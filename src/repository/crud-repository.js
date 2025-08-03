// const logger = require('../config/logger');
import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/errors/App-Error.js';

class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data){
        const response = await this.model.create(data);
        return response ; 
    }

    async bulkCreate(data){
        const response = await this.model.insertMany(data);
        return response ; 
    }

    async delete(data){
        const response = await this.model.deleteOne(data);
        if(!response){
            throw new AppError("No Results with requested id", StatusCodes.NOT_FOUND);
        }
        return response ;    
    }

    async get(data){
        const response = await this.model.find(data);
        if(!response.length){
            throw new AppError("No Results with requested id", StatusCodes.NOT_FOUND);
            
        }
        
        return response ;
    }


    async getAll(){
        const response = await this.model.find({});
        return response ;
    }

    // async update(id,data){   //data -> {column:value}
    //     const response = await this.model.update(data , {
    //         where: {
    //             id:id
    //         }
    //     });
    //     if(!response){
    //         throw new AppError('Not found anything with given id', StatusCodes.NOT_FOUND);
            
    //     }
    //     return response ;
    // }
}



export default CrudRepository;