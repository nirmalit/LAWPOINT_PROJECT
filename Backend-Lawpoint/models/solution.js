const mongoose=require('mongoose');
const { ObjectId }=mongoose.Schema();
const solutionSchema=mongoose.Schema({
    provider:{
        type:String,
        required:true,
    },
    details:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    caseid:{
        type:String,
        required:true
    }
},{ timestamps:true });

module.exports=mongoose.model('Solution',solutionSchema);
