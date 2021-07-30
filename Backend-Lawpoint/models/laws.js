const mongoose=require('mongoose');
const { ObjectId }=mongoose.Schema();
const lawSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    departments:{
        type:ObjectId,
        ref:'Department',
        required:true
    }

},{ timestamps:true });

module.exports=mongoose.model('Law',lawSchema);
