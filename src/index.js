import express from "express";
import connect from "./config/index.js";
import apiRoutesV1 from "./routes/V1/index.js"



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1' , apiRoutesV1)



app.listen(3000 , async() => {
    console.log('Server running on PORT 3000');
    await connect();
    console.log('monogDB connected');

    // const hashtagRepo = new HashtagRepository();

    // hashtagRepo.create({
    // text: "travelling" ,
    // tweets: '688c5abf1117904ec26bde10',
    // })
    

    


})