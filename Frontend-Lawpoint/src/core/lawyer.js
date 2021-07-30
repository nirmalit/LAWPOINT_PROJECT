import React,{useState,useEffect} from 'react'
import Base from './base';
import { getLawyer } from './helper/lawyerHelper';
import { Lawyercard } from './Lawyercard';

const Lawyer=()=> {
    const [value,setValue]=useState([]);
    const preLoader=()=>{
        getLawyer().then(data=>{
            if(data.error){
                setValue([])
            }else{
                setValue(data)
            }
        })
    }
    useEffect(() => {
        preLoader()
    }, [])
    return (
        <div>
            <Base title="LAWYER" description="Consult a lawyer" />
            {value.map((lawyer,index)=>{
                return (<Lawyercard lawyer={lawyer} />)
            })}
        </div>
    )
}

export default Lawyer;