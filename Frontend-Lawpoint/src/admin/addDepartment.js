import React,{ useState,useEffect } from 'react'
import Base from '../core/base';
import { isauthenticated } from './../auth/helper/credential';
import { createDepartment } from './helper/adminHelper';
import { Link } from 'react-router-dom';


export const AddDepartment = () => {
    const {user ,token}=isauthenticated();
    const [values,setValues]=useState({
        name:"",
        photo:"",
        error:"",
        createdDepartment:"",
        getRedirect:false,
        formData:''
    });

    const {name,error,getRedirect,createdDepartment,formData}=values

    const onSubmit=event=>{
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
          createDepartment(user._id,token,formData).then(data=>{
            if(data.error){
              setValues({...values,error:data.error})
            }else{
              setValues({...values,
                name:"",
                photo:"",
                loading:false,
                getaRedirect:true,
                createdDepartment:data.name
            })
            }
          })
      }
    const back=()=>{
        return(
            <div className="btn btn-dark mt-2 text-white ml-2">
                <Link to="/profile/admin">Back to DashBoard</Link>
            </div>
        );
    }
    const preLoader=()=>{
      setValues({
        ...values,
        formData:new FormData()
      })
    }
    useEffect(() => {
      preLoader();
    }, [])
    const successMessage=()=>{
        return (
        <div className="alert alert-success mt-3" role="alert"
        style={{display : createdDepartment? "" : "none"}}
        >
        <h4>{createdDepartment} is successfully Created..!</h4>
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
        const value=name==="photo"? event.target.files[0]:event.target.value;
        formData.set(name,value);  //doubt_____
        setValues({...values,[name]:value});
    }

    const departmentForm=()=>(
        <form className="shadow"> 
            <div className="container">
            <div className="form-group">
            <span>POST PHOTO</span>
                <label className="btn btn-block">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"    
                    />
                </label>
            </div>
            <div className="form-group">
            <input
              onChange={handleChange("name")}
              className="form-control"
              placeholder="name"
              value={name}
            />
          </div>
          <button type="submit" onClick={onSubmit} className="btn btn-outline-secondary mb-2">
            Create Product
          </button>
          </div>
        </form>
    )
    return (
        <div>
            <Base title="Department Creation" description="Create a departments for posting query" />
            {back()}
            <div className="row">
                <div className="col-8 offset-2">
                {errorMessage()}
                {successMessage()}
                {departmentForm()}
                </div>
            </div>
        </div>
    )
}
