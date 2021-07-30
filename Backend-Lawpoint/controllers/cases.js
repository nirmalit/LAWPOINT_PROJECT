const Case=require("../models/cases");
const { check, validationResult } = require('express-validator');

exports.getCaseById=(req,res,next,id)=>{
    Case.findById(id)
    .exec((err,cases)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            });
        }
        req.case=cases;
        next();
    });
};

exports.createCase=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const cases=new Case(req.body);
    cases.save((err,cases)=>{
        if(err){
            return res.status(400).json({
                err:"DB requirement is not stasified"
            });
        }
        res.json(cases);
    })
}

exports.updateCaseById=(req,res)=>{
    Case.findByIdAndUpdate(req.case._id,req.case,(err,updateCase)=>{
        if(err){
            return res.status(400).json({
                error:"problem in case DB update"
            });
        }
        return
    })
}
exports.updateCase=(req,res)=>{
    let form=formidable.IncomingForm();
    form.keepExtension=true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem in form"
            });
        }
        
        let cases=req.case;

        cases=_.extend(cases,fields);
        cases.save((err,cases)=>{
            if(err){
                return res.status(400).json({
                    error:"Problem in Database,check Db requirements"
                });
            }
            res.json(cases)
        })
    })
}

exports.getAllCase=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy=req.query.sortBy ? req.query.sortBy : "_id";
    Case.find()
        .populate("departments")
        .sort([[sortBy,"asc"]])
        .limit(limit)
        .exec((err,cases)=>{
        if(err){
            return res.status(400).json({
                error:"can not able to get the cases"
            });
        }
        return res.json(cases);
    })
};

exports.deleteCase=(req,res)=>{
    let cases=req.case;
    cases.remove((err,deletedCases)=>{
        if(err){
            return res.status(400).json({
                error:"Problem in deletion"
            });
        }
        return res.json({
            message:"Successfully deleted the cases",
            deletedCases
        });
    });
}