import React,{useState,useEffect} from 'react'
import Base from './../core/base';
import { getAllDepartment } from '../admin/helper/adminHelper';
import { isauthenticated } from './../auth/helper/credential';
import { Link } from 'react-router-dom';
import { createCase } from './helper/casesHelper';

export const Cases = () => {
    const {user ,token}=isauthenticated();
    const [values,setValues]=useState({
        title:"",
        description:"",
        departments:"",
        allDepartments:[],
        postedBy:"",
        createdCase:"",
        getRedirect:false,
        error:"",
        loading:""
    });
    const goBack=()=>{
        return(
            <div className="btn btn-secondary text-white">
                <Link to="/profile/user" className="nav-link">Back to DashBoard</Link>
            </div>
        );
    }
    const preLoader=()=>{
        getAllDepartment().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    allDepartments:data,
                    postedBy:user._id,
                })
            }
        }).catch(err=>console.log(err))
    }
    useEffect(() => {
        preLoader()
    }, [])
    const {title,description,departments,allDepartments,postedBy,createdCase,error,getRedirect,loading}=values

    const onSubmit=event=>{
        event.preventDefault();
        setValues({...values,error:"",loading:true});
        createCase(user._id,{title,description,departments,postedBy},token).then(data=>{
            if(data.error){
                setValues({...values,error:data.error});
            }else{
                setValues({
                    title:"",
                    description:"",
                    postedBy:"",
                    loading:false,
                    getRedirect:true,
                    createdCase:data.title
                })
            }
        })
    }
    const successMessage=()=>{
        return (
        <div className="alert alert-success mt-3" role="alert"
        style={{display : createdCase? "" : "none"}}
        >
        <h4>{createdCase} is successfully Created..!</h4>
        <p>Redirecting to Dash Board in 2 second....</p>
        </div>
        );
      }
  
      const errorMessage=()=>(
        <div className="alert alert-danger mt-3" role="alert"
        style={{display:error ? "":"none"}}
        >
        <h4>failed to create a Product</h4>
        <h5>Reason :</h5><p>{error}</p>
        </div>
      )
  
      const handleChange=name=>event=>{
          const value=event.target.value;
          setValues({...values,[name]:value});
      }
      const casesForm=()=>(
          <form>
            <div className="form-group mb-3"> 
                <label className="text-dark">Title For your Case</label> 
                <input value={title} onChange={handleChange("title")} className="form-control" type="text"/> 
            </div> 
            <div className="form-group mb-3"> 
                <label className="text-dark">Detail about case</label> 
                <textarea value={description} onChange={handleChange("description")} className="form-control" type="text"/> 
            </div> 
            <div className="form-group mb-3">
                <select
                    onChange={handleChange("departments")}
                    className="form-control"
                    placeholder="departments"
                >
                    <option>Department</option>
                    {(allDepartments)&&(
                        allDepartments.map((dept,index)=>(
                            <option key={index} value={dept._id}>{dept.name}</option>
                        ))
                    )}
                </select>
            </div>
            <button type="submit" onClick={onSubmit} className="btn btn-outline-secondary mb-2">
            Create Case
          </button>
          </form>
      )
    return (
        <div>
            <Base title="Case Creation" description="Create a query which needed to be solved" />
            <div className="container">
            {goBack()}
            {errorMessage()}
            {successMessage()}
                <div className="col-8 offset-4">
                {casesForm()}
                </div>
            </div>
        </div>
    )
}
