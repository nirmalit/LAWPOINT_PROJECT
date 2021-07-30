import React,{ useState } from 'react'
import Base from './../core/base';
import signUpLogo from "../images/signup.png"
import { signup } from './helper/credential';

const Signup=()=>{
    const [values,setValues]=useState({
        name:"",
        date_of_birth:"",
        email:"",
        phone:"",
        city:"",
        state:"",
        country:"",
        pincode:"",
        password:"",
        loading:"",
        success:"",
        error:""
    })

    const changesHandler= name =>event=>{
        setValues({
            ...values,
            error:false,
            [ name ]:event.target.value
        })
    }
    const {name,date_of_birth,email,phone,city,state,country,pincode,password,loading,success,error}=values;
    const onsubmit=event=>{
        event.preventDefault();
        setValues({...values,loading:true,error:false});
        signup(values
        ).then(data=>{
            if(data?.error){
                setValues({...values,error:data?.error,success:false})
            }else{
                setValues({...values,name:"",email:"",password:"",error:"",phone:"",date_of_birth:"",city:"",pincode:"",success:true})
            }
        }).catch(console.log("signup error occured"))

    }

    const loadMessage=()=>(
        <div className="row">
            <div className=" col-sm-6 offset-3">
                <div className="alert alert-success"
                style={{display:loading?"":"none"}} >
                    Loading....
                </div>
            </div>
        </div>
    )
    const successMessage=()=>(
        <div className="row">
            <div className=" col-sm-6 offset-3">
                <div className="alert alert-success"
                style={{display:success?"":"none"}} >
                    Account created successfully
                </div>
            </div>
        </div>
    )
    const errorMessage=()=>(
        <div className="row">
            <div className="col-sm-6 offset-3 text-center">
                <div className="alert alert-danger shadow mb-3 mt-3"
                style={{display:error?"":"none"}} >
                    {error}
                </div>
            </div>
        </div>
    )
    const signupForm=()=>(
        <form className="mt-4"> 
            <div className="form-group mb-3"> 
                <label className="text-dark">Name</label> 
                <input value={name} onChange={changesHandler("name")} className="form-control" type="text"/> 
            </div> 
            <div className="form-group mb-3"> 
                <label className="text-dark">Date Of Birth</label> 
                <input value={date_of_birth} onChange={changesHandler("date_of_birth")} className="form-control" type="text"/> 
            </div> 
            <div className="form-group mb-3"> 
                <label className="text-dark">Email ID</label> 
                <input value={email} onChange={changesHandler("email")} className="form-control" type="email"/> 
            </div> 
            <div className="form-group mb-3"> 
                <label className="text-dark">Phone</label> 
                <input value={phone} onChange={changesHandler("phone")} className="form-control" type="Number"/> 
            </div>
            <div className="form-group mb-3"> 
                <label className="text-dark">City/Village</label> 
                <input value={city} onChange={changesHandler("city")} className="form-control" type="text"/> 
            </div>
            <div className="form-group mb-3"> 
                <label className="text-dark">State</label> 
                <input value={state} onChange={changesHandler("state")} className="form-control" type="text"/> 
            </div>
            <div className="form-group mb-3"> 
                <label className="text-dark">Country</label> 
                <input value={country} onChange={changesHandler("country")} className="form-control" type="text"/> 
            </div>
            <div className="form-group mb-3"> 
                <label className="text-dark">Pin Code</label> 
                <input value={pincode} onChange={changesHandler("pincode")} className="form-control" type="Number"/> 
            </div>
            <div className="form-group mb-3"> 
                <label className="text-dark">Password</label> 
                <input value={password} onChange={changesHandler("password")} className="form-control" type="password"/> 
            </div> 
            <button onClick={onsubmit} className="btn btn-dark btn-block mb-1">submit</button> 
        </form> 
    )

    
    return (
        <div >
            <Base title="SIGNUP" description="Create an account" />
            {loadMessage()}
            {errorMessage()}
            {successMessage()}
            <div className="row">
            <div className="col-6">
            <img src={signUpLogo} alt="sign in" className="img-fluid" /> 
            </div>
            <div className="col-6">
                <div className="container">{signupForm()}</div>
            </div>
            </div>    
        </div>
    )
}
export default Signup;