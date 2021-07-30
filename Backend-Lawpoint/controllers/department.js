const Department=require("../models/department");

const formidable=require("formidable");

const fs=require("fs");
const _=require("lodash");



exports.getDepartmentById=(req,res,next,id)=>{
    Department.findById(id).populate("department").exec((err,dept)=>{
        if(err){
            return res.status(400).json({
                error:"departments not found"
            });
        }
        req.department=dept;
        next();
    });

};

exports.createDepartment=(req,res)=>{

    let form=formidable.IncomingForm();
    form.keepExtension=true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem in form photo"
            });
        }

        const {name}=fields;

        if(!name){
            return res.status(400).json({
                error:"please include value in all the fields"
            });
        }

        let department=new Department(fields);
        
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"Photo size must less than 3mb"
                });
            }
            department.photo.data=fs.readFileSync(file.photo.path);
            department.photo.contentType=file.photo.type;
        }
        department.save((err,dept)=>{
            if(err){
                return res.status(400).json({
                    error:"photo and form value not saved in DB"
                });
            }
            res.json(dept);
        });

    })


};

exports.getDepartment=(req,res)=>{
    req.department.photo=undefined;
    return res.json(req.department);
};
exports.getAllDepartment=(req,res)=>{
    Department.find().exec((err,dept)=>{
        if(err){
            return res.status(400).json({
                error:"Categories is not found"
            });
        }
        res.json(dept);
    });
};
exports.updateDepartment=(req,res)=>{

    let form=formidable.IncomingForm();
    form.keepExtension=true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem in form photo"
            });
        }
        
        //code updation
        let department=req.department;
        department=_.extend(department,fields);

        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"Photo size must less than 3mb"
                });
            }
            department.photo.data=fs.readFileSync(file.photo.path);
            department.photo.contentType=file.photo.type;
        }
        department.save((err,department)=>{
            if(err){
                return res.status(400).json({
                    error:"photo and form value not updated in DB"
                });
            }
            res.json(department);
        });
    });
};
;

exports.removeDepartment=(req,res)=>{
    const department=req.department
    department.remove((err,department)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to delete department"
            });
        }
        res.json({
            name:department,
            message:"Successfully department is deleted"
        });
    });
}

exports.photo=(req,res,next)=>{
    if(req.department.photo.data){
        res.set("Content-Type",req.department.photo.contentType);
        return res.send(req.department.photo.data);
    }
    next();
};