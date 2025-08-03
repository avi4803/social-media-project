import Hashtag from "../models/hashtag.js";
import CrudRepository from "./crud-repository.js";

class HashtagRepository extends CrudRepository{
    constructor(){
        super(Hashtag);
    }

async getHashtagByName(data){
    const hashtag = await Hashtag.find({
        text:data
    })
    return hashtag;
}

}


export default HashtagRepository;