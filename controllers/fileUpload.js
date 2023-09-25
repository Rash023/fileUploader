const { cloudinaryConnect } = require('../config/cloudinary');
const File=require('../models/Files');
const cloudinary=require('cloudinary').v2;



//uploading file in local directory
exports.localFileUpload= async (req,res)=>{
    try{
        //fetching the file
        const file=req.files.file; 

        console.log("file:",file);

        let path= __dirname + "/files/ " + Date.now() +`.${file.name.split('.')[1]}`;
        file.mv(path,(err)=>{
            console.log(err);

        });

        res.status(200).json({
            success:true,
            message:"local file uploaded succesfully",
        });


    }
    catch(error){
        console.log(error);
        console.log("issues uploading file");


    }
}

//function to validate the file type

function isFileTypeSupported(type,supportTypes){
    return supportTypes.includes(type);
}

//function to upload file to cloudinary
async function uploadFiletoCloudinary(file,folder,quality){
    const options={folder};
    options.resource_type="auto";
    if(quality){
        options.quality=quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

//image uploading handler

exports.imageUpload= async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);
        const file=req.files.imageFile;
        console.log(file);


        //validation

        const supportTypes=["jpg","png","jpeg"];
        const type=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(type,supportTypes)){
            return res.status(400).json({
                sucess:false,
                message:"Not a valid file type",
            });

        }

        const response= await uploadFiletoCloudinary(file,"Rashid");
        console.log('response',response);

        
        //saving the entry in db
        const fileData= await File.create({
            name,
            tags,
            email,
            image_url:response.secure_url,
        })
        
        res.json({
            sucess:true,
            image_url:response.secure_url,
            message:"Image uploaded succesfully",
        });

    }
    
    catch(error){
        console.error(error);
        res.status(404).json({
            succes:false,
            message:"error uploading image",
        });

    }
}


//video uploading handler


exports.videoUpload= async(req,res)=>{

    try{

        const{name,tags,email}=req.body;
        console.log(name,tags,email);
        const file=req.files.videoFile;
        const supportTypes=["mp4","mov","mkv"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("filetype:",fileType);


        if(!isFileTypeSupported(fileType,supportTypes)){
            return res.status(400).json({
                succes:false,
                message:"Not a supported file type",
            });

        }

        const response=await uploadFiletoCloudinary(file,"Rashid");
        console.log(response);

        const fileData= await File.create({
            name,
            tags,
            email,
            image_Url:response.secure_url,

        });

        res.status(200).json({
            succes:true,
            message:"Video uplaoded succesfully",
        });

         



    }
    catch(error){
        console.error(error);
        res.status(400).json({
            succes:false,
            message:"Something went wrong",
        });

    }

}

//image size reducer

exports.imageSizeReducer= async (req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);
        const file=req.files.imageFile;
        console.log(file);


        //validation

        const supportTypes=["jpg","png","jpeg"];
        const type=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(type,supportTypes)){
            return res.status(400).json({
                sucess:false,
                message:"Not a valid file type",
            });

        }

        const response= await uploadFiletoCloudinary(file,"Rashid",30);
        console.log(response);

        
        //saving the entry in db
        const fileData= await File.create({
            name,
            tags,
            email,
            image_url:response.secure_url,
        })
        
        res.json({
            sucess:true,
            image_url:response.secure_url,
            message:"Image uploaded succesfully",
        });



    }
    catch(error){
        console.error(error);
        res.status(400).json({
            sucess:false,
            message:"Error reducing image size",
        });

    }
}