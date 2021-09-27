const express=require('express');
const router=express.Router();

const {isSignIn,isAdmin,isAuthenticated}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");
const {addSolution,removeSolution,updateSolution,getSolution,getSolutionById,updateSolutionLikes}=require("../controllers/solution");
const { getCaseById } = require('../controllers/cases');


router.param("userId",getUserById);
router.param("solutionId",getSolutionById);
router.param("caseId",getCaseById);

router.get("/solution/:userId/:solutionId",isSignIn,getSolution)
router.post("/solution/:userId/:caseId",isSignIn,isAuthenticated,addSolution);
router.put("/solution/:userId/:solutionId",isSignIn,isAuthenticated,updateSolution);
router.put("/solution/like/:userId/:solutionId",isSignIn,isAuthenticated,updateSolutionLikes);
router.delete("/solution/:userId/:solutionId",isSignIn,isAuthenticated,removeSolution);


module.exports=router;
