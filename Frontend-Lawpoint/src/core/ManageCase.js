import React,{useState,useEffect} from 'react'
import { isauthenticated } from '../auth/helper/credential';
import Base from './base';
import { Link } from 'react-router-dom';
import { getAllCases } from '../user/helper/casesHelper';
import { PrivateCard } from './privateCard';


export const ManageCase = () => {
    const {user ,token}=isauthenticated();
    const [values,setValues]=useState({
        allCase:[],
        mycases:""
    })
    const preLoader=()=>{
        getAllCases().then(data=>{
            if(data.error){
                setValues({
                    ...values,
                    error:data.error
                })
            }else{
                setValues({
                    ...values,
                    allCase:data
                })
            }
        })
    }
    useEffect(() => {
        preLoader();
    }, [])
    const goBack=()=>{
        if(isauthenticated().role===0){
            return(
            <div className="btn btn-secondary text-white">
                <Link to="/profile/admin" className="nav-link">Back to DashBoard</Link>
            </div>
        );
        }else{
            return(
                <div className="btn btn-secondary text-white">
                    <Link to="/profile/user" className="nav-link">Back to DashBoard</Link>
                </div>
            );
        }
    }
    const handleChange=name=>event=>{
        const value=event.target.value;
        setValues({...values,[name]:value});
    }
    const leftPannel=()=>(
        <div className="container">
            <form>
            <div className="form-group mb-3">
                <select
                    onChange={handleChange("mycases")}
                    className="form-control"
                    placeholder="Case Switch"
                >
                    <option>Switch</option>
                    <option key="one" value={true}>All Cases</option>
                    <option key="two" value={""}>My Cases</option>
                    {/* {(allDepartments)&&(
                        allDepartments.map((dept,index)=>(
                            <option key={index} value={dept._id}>{dept.name}</option>
                        ))
                    )} */}
                </select>
            </div>
            </form>
        </div>
    )
    return (
        <div className="container">
            <Base title="Cases Manager" description="Managing the cases that are avilable" />
            {goBack()}
            <div className="row mt-2">
                <div className="col-3">
                    {leftPannel()}
                </div>
                <div className="col-9">
                 {values.allCase.map((aCase,index)=>{
                     if(values.mycases){
                        return(
                            <div key={index}>
                                <PrivateCard item={aCase} />
                            </div>
                        )
                    }else{
                        if(aCase.postedBy===user._id){
                            return(
                                <div key={index}>
                                    <PrivateCard item={aCase} />
                                </div>
                            )
                        }
                    }
                 })} 
                </div>
            </div>
        </div>
    )
}
