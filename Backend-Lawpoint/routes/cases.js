const express=require("express");
const router=express.Router();

const { isAdmin ,isAuthenticated ,isSignIn} = require("../controllers/auth");
const {getUserById}=require("../controllers/user");

const {getCaseById,createCase,getAllCase,updateCase,deleteCase}=require("../controllers/cases");


router.param("userId",getUserById);
router.param("caseId",getCaseById);

router.post("/case/:userId/create",isSignIn,isAuthenticated,createCase);
router.get("/case",getAllCase);
router.put("/case/:userId/:caseId",isSignIn,isAuthenticated,updateCase);
router.delete("/case/:userId/:caseId",isSignIn,isAuthenticated,deleteCase);

module.exports=router;
