const mongoose=require('mongoose');

require("dotenv").config();


exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("Db connected succesfully"))
    .catch((error)=>{
        console.error(error);
        console.log("Db facing connection issues");
        process.exit(1);
    });
}