import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getUserByEmail(data){
    const user = await User.find({
        email:data
    })
    return user;
}
}

export default UserRepository;