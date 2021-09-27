const express=require("express");
const router=express.Router();

const {getUserById,getUser,updateUser,allLawyer}=require("../controllers/user")
const {isSignIn, isAuthenticated,isAdmin,isLawyer}=require("../controllers/auth")

router.param("userid",getUserById);
router.get("/user/:userid",isSignIn,isAuthenticated,getUser);
router.put("/user/:userid",isSignIn,isAuthenticated,updateUser);
router.get("/lawyers",allLawyer)

module.exports=router;