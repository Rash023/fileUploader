const mongoose=require('mongoose');
const nodemailer=require('nodemailer');

const fileSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },

    email:{
        type:String,
    }

});


//post middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("DOC:",doc);
        let transporter=nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },

            


        });

        console.log(doc.imageUrl);

        //sending mail
        let info= await transporter.sendMail({
            from:`Rashid`,
            to:doc.email,
            subject:"New file uploaded on Slick",
            html:`<h2>Hello ji</h2>  <p>File uploaded <br> <a href="${doc.imageUrl}">Click here</a></p>`,
        })

        console.log("info:",info);
    }
    catch(error){
        console.log(error);
        
    }
})

const File=mongoose.model("File",fileSchema);
module.exports=File;