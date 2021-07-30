import React,{ useState,useEffect}  from 'react'
import Base from '../core/base'
import { getAllDepartment, removeDepartment } from './helper/adminHelper';
import { Link } from 'react-router-dom';
import { isauthenticated } from './../auth/helper/credential';


export const ManageDepartment = () => {
    const [department,setDepartment]=useState([]);
    const{ user,token }=isauthenticated();

    const preloader=async()=>{
        getAllDepartment().then((data)=>{
            if(data.error){
                console.log("error occured")
            }else{
                setDepartment(data);
                console.log(data);
            }
        })
    }
    useEffect(() => {
        preloader()
    }, [])
    const performDelete=departmentID=>{
        removeDepartment(user._id,departmentID,token).then((data)=>{
            if(data.error){
                console.log("Can not able to delete");
                console.log(data.error);
            }else{
                preloader();
            }
        })
    }
    return (
        <div>
            <Base title="Managing Departments" description="Update and delete the departments"/>
            <div className="container shadow ">
            <div className="card text-center">
                <h1>Departments</h1>
                {
                department.map((dept,index)=>(
                    <div key={index} className="row text-center mb-2 ">
                    <div className="col-4">
                <h3 className="text-dark text-left">{dept.name}</h3>
                    </div>
                    <div className="col-4">
                      <Link
                        className="btn btn-success"
                        to={`/admin/department/update/${dept._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4">
                      <button onClick={()=>performDelete(dept._id)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                ))
            }
            </div>
            </div>
        </div>
    )
}
