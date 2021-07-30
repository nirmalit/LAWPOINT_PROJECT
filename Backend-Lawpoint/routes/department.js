const express=require("express");
const router=express.Router();

const {isSignIn,isAdmin,isAuthenticated}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");

const {getDepartmentById,createDepartment,getDepartment,getAllDepartment,updateDepartment,removeDepartment}=require("../controllers/department");

router.param("userId",getUserById);
router.param("departmentId",getDepartmentById);

router.post("/department/create/:userId",isSignIn,isAuthenticated,isAdmin,createDepartment);
router.get("/department/:departmentId",getDepartment);
router.get("/departments",getAllDepartment);
router.put("/department/:departmentId/:userId",isSignIn,isAuthenticated,isAdmin,updateDepartment);
router.delete("/department/:departmentId/:userId",isSignIn,isAuthenticated,isAdmin,removeDepartment);



module.exports=router;