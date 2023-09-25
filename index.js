const express=require('express');
const app=express();
const fileUpload=require('express-fileupload');



require('dotenv').config();

const PORT=process.env.PORT || 3000;



//adding middlewares
app.use(express.json());

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

//connecting with db
const db=require('./config/database');
db.connect();

//connecting with cloudinary
const cloudinary=require('./config/cloudinary');
cloudinary.cloudinaryConnect();


//mounting api route
const Upload=require('./routes/fileUpload');
app.use('/api/v1/uplaod',Upload);


//activate server
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);

})

