const api="http://localhost:8000/api"
export const createCase=(userId,cases,token)=>{
    return fetch(`${api}/case/${userId}/create`,
    {
        method:"POST",
        headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(cases)
    }).then((res)=>(res.json())
    ).catch(err=>console.log(err))
}

export const getAllCases=()=>{
    return fetch(`${api}/case`,{
        method:"GET"
    }).then((res)=>res.json()
    ).catch(err=>console.log(err))
}

export const updateCases=(userId,cases,caseId,token)=>{
    return fetch(`${api}/${userId}/${caseId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(cases)
    }).then((res)=>(res.json())
    ).catch(err=>console.log(err))
}