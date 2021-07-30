const mongoose=require('mongoose');

const departmentSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{ timestamps : true });
module.exports=mongoose.model('Department',departmentSchema);