const Solution=require("../models/solution");
const { updateCaseById } = require("./cases");

exports.getSolutionById=(req,res,next,id)=>{
    Solution.findById(id)
    .exec((err,solu)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            });
        }
        req.solution=solu;
        next();
    });
};
exports.getSolution=(req,res)=>{
    let solution=req.solution;
    return res.json(solution)
}


exports.addSolution=(req,res)=>{
    const solution=new Solution(req.body);
    solution.provider=req.profile.id
    solution.caseid=req.case.id
    solution.save((err,solu)=>{
        if(err){
            return res.status(400).json({
                error:"DB requirements is not stasified"
            })
        }
        let temp=req.case.solutions
        req.case.solutions=temp.push(solu)
        updateCaseById(req,res)
        return res.json({
            result:"Solution has been added"
        })
    })
}

exports.updateSolution=(req,res)=>{
    const solution=new Solution(req.solution);
    solution.details=req.body.details
    solution.save((err,updatedSolution)=>{
        if(err){
            return res.status(400).json({
                error:"not able to update in DB"
            })
        }
        return res.json(updatedSolution);
    })
}
exports.updateSolutionLikes=(req,res)=>{
    const solution=req.solution;
    solution.likes=solution.likes+1;
    solution.save((err,updatedSolution)=>{
        if(err){
            return res.status(400).json({
                error:"not able to update in DB"
            })
        }
        return res.json(updatedSolution);
    })
}

exports.removeSolution=(req,res)=>{
    const solution=req.solution;
    solution.remove((err,deletedSolution)=>{
        if(err){
            return res.status(400).json({
                error:"not able to delete in DB"
            })
        }
        return res.json({
            value:deletedSolution,
            message:"Successfully deleted"
        });
    })
}