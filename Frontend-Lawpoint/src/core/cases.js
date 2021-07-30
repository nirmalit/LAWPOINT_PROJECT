import React,{useState,useEffect} from 'react'
import { getAllCases } from '../user/helper/casesHelper';
import Base from './base';
import { isauthenticated } from './../auth/helper/credential';
import { Card } from './card';


const Case=()=>{
    const [values,setValues]=useState({
        allCase:[],
        error:""
    });
    const {user,token}=isauthenticated();
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
    return (
        <div>
            <Base title="CASES" description="Give Solution for legal Problem" />
            <div className="container">
            <div className="row text-center">
                        {values.allCase.map((cases,index)=>{
                            return(
                                <div key={index} className="col-4">
                                    <Card acase={cases} />
                                </div>
                            )
                        })}
                    </div>
            </div>
        </div>
    )
}

export default Case;