const mongoose=require("mongoose");
const { ObjectId }=mongoose.Schema;

const caseSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    departments:{
        type:ObjectId,
        ref:'Department',
        required:true
    },
    solutions:[{
        type:ObjectId,
        ref:"Solution"
    }],
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
},{ timestamps:true });

module.exports=mongoose.model('Case',caseSchema);
