const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User=require("../models/user");

const { check, validationResult } = require('express-validator');



exports.signin=(req,res)=>{
    const errors=validationResult(req);
    const { email,password }=req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    User.findOne({email},(err,user)=>{
        if(err || !user){
            res.status(400).json({
                error:"User email does not exist"
            });
        }
        if(!user.authenticate(password)){
            return res.status(400).json({
                error:"email and password does not match"
            });
        }
        //token
        const token = jwt.sign({ _id:user._id }, process.env.SECRET);
        res.cookie("token",token,{ expire: new Date() + 9999 });   

        const { _id,name,email,role }=user;
        return res.json({ token, user:{ _id,name,email,role }});
    })
}

exports.signup=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error:errors.array()[0].msg
        })
    }
    const user=new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:"DB requirement is not stasified"
            });
        }
        res.json({
            id:user._id,
            name:user.name
        });

    });
}


exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"signout successfully"}
    );
}

//protector for routes
exports.isSignIn=expressJwt({
    secret: process.env.SECRET,
    userProperty:"auth"
});

//coustom routes
exports.isAuthenticated=(req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role!=0){
       return res.status(403).json({
            error:"ACCESS DENIED, your are not admin"
        })
    }
    next();
}



exports.isLawyer=(req,res,next)=>{
    if(req.profile.role!=1){
       return res.status(403).json({
            error:"ACCESS DENIED, your are not Lawyer"
        })
    }
    next();
}