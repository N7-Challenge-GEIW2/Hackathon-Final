const mongoose=require("mongoose")

const urlSchema=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
})

module.exports=mongoose.model("Url",urlSchema)