const express=require("express");
const router=express.Router();
const { signout,signup,signin, isSignIn } =require("../controllers/auth");
const { check, validationResult } = require('express-validator');

router.post("/signin",[
    check("email")
    .isEmail().withMessage('email must required'),
    check("password")
    .isLength({ min:1 }).withMessage("Require password")
],signin);

router.post("/signup",[
    check("name")
    .isLength({ min: 2 }).withMessage('must be at least 2 chars long'),
    check("email")
    .isEmail().withMessage('email must required'),
    check("phone")
    .exists().withMessage("Contact info contain both email and phone number")
],signup);

router.get("/signout",signout);

router.get("/test",isSignIn,(req,res)=>{
    res.json(req.auth)
});

module.exports=router;