import React,{useState,useEffect} from 'react'
import { isauthenticated } from '../auth/helper/credential'
import { getSolution } from './helper/solutionHelper'

export const PrivateCard = ({item}) => {

    const {user,token}=isauthenticated();
    const [value,setValue]=useState({
        solution:[]
    });

    const getter=(solId)=>{
        const {user,token}=isauthenticated();
        getSolution(user._id,solId,token).then((data)=>{
            let {solution}=value;
            solution.push(data)
            setValue({
                solution:solution
            })
        }).catch(err=>console.log("error is :"+err))
    }
    
    useEffect(() => {
        if(item.solutions!=[]){
        item.solutions.map((solId,index)=>{
            getter(solId)
        })
    }
    }, [])

    return (
        <div className="row container mt-2 mb-2">
            <div className="card shadow">
            <h2>{item.title}</h2>
            </div>
            <div className="card shadow">
              {value.solution.map((v,i)=>(<p key={i}>{v.details}</p>))}
            </div>
        </div>
    )
}
