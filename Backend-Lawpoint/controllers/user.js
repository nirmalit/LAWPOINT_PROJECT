const User=require("../models/user");
const {isAdmin,checkAdmin}=require("../controllers/auth")


exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"no user found"
            })
        }
        req.profile=user;
        next();
    })
}

exports.getUser=(req,res)=>{
    req.profile.salt=undefined;
    req.profile.encrypted_password=undefined;
    return res.json(req.profile);
}

exports.updateUser=(req,res)=>{
    if(req.body.role===undefined || req.profile.role===0){
        User.findByIdAndUpdate(
                    { _id:req.profile._id },
                    { $set: req.body },
                    {new:true , useFindAndModify:false},
                    (err,user)=>{
                        if(err){
                            return res.status(400).json({
                                error:"Error during updation"
                            })
                    }
            user.salt=undefined;
            user.encrypted_password=undefined;
            return res.json(user);
        }
    )
    }else{
        return res.json({
            error:"Your are not Permited"
        })
    }
}

exports.allLawyer=(req,res)=>{
    User.find({"role":1},(err,user)=>{
        if(err){
            return res.json({
                "error":err
            })
        }else{
            user.map((singleUser,index)=>{
                singleUser.salt=undefined;
                singleUser.encrypted_password=undefined;
            })
            return res.json(user)
        }
    })
}