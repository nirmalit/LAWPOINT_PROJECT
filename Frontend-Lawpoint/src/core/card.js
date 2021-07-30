import React,{useState} from 'react'
import { isauthenticated } from './../auth/helper/credential';
import { addSolution } from './helper/solutionHelper';
import { findUserById } from './../user/helper/searchUser';

export const Card = ({acase}) => {
    const [values, setValues] = useState({
        redirect:false,
        error:"",
        success:"",
        details:"",
        postedBy:""
    })
    let AddSolutionButton;
    if(isauthenticated()){
      AddSolutionButton=true;
    }else{
      AddSolutionButton=false;
    }
    const {user,token}=isauthenticated();
    const title=acase?acase.title:"Default Name";
    const description=acase?acase.description:"Default Description";
    const postedByUserId=acase?acase.postedBy:"Default Description";
    
    const handleChange=name=>event=>{
        const value=event.target.value;
        setValues({...values,[name]:value});
    }
    const onSubmit=event=>{
      const {details}=values;
      event.preventDefault();
      addSolution(user._id,acase._id,token,details).then((data)=>{
        if(data.error){
          setValues({...values,
            error:data.error})
        }else{
          setValues({
            ...values,
            success:true
          })
        }
      }).catch(err=>console.log(err))

    }
    
    const {error,success,details}=values;
    const successMessage=()=>{
      return (
      <div className="alert alert-success mt-3" role="alert"
      style={{display : success? "" : "none"}}
      >
      <h5>successfully Added the solution..!</h5>
      </div>
      );
    }

    const errorMessage=()=>(
      <div className="alert alert-danger mt-3" role="alert"
      style={{display:error ? "":"none"}}
      >
      <h4>failed to add solution</h4>
      <h5>Reason :</h5><p>{error}</p>
      </div>
    )

    const displayAddSolutionButton=()=>{
        return(
          AddSolutionButton && (<form className="card-footer">
                <label className="text-dark">Add Solution</label> 
                <input value={details} onChange={handleChange("details")} className="form-control" type="text"/> 
                <button type="submit" onClick={onSubmit} className="btn btn-outline-secondary mb-2">
                submit
                </button>
            </form>)
        )
    }
    const displayPostedUser=()=>{
      findUserById(postedByUserId,token).then((response)=>{
      if(isauthenticated() && !response.error){
        setValues({
          ...values,
          postedBy:response.name
        })
    }}
    )}
    return (
      <div className="mt-2">
        {errorMessage()}
        {successMessage()}
        <div className="card text-white shadow border rounded">
        <div className="card-header text-dark lead">{title}</div>
        <div className="card-body">
          <p className="lead text-dark font-weight-normal text-wrap">
            {description}
          </p>
         
          <div className="row">
            <div className="col-12">
              {displayAddSolutionButton()}
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}
