import mongoose from "mongoose";

const connect = async() => {
    await mongoose.connect('mongodb+srv://avinashn157:1007@twitterclonecluster.ewug6pk.mongodb.net/')
}

export default connect;