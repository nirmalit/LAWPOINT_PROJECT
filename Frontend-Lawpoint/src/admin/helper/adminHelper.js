const api="http://localhost:8000/api";
export const createDepartment=(userId,token,department)=>{
    return fetch(`${api}/department/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:department
    }).then(res=>res.json()
    ).catch(err=>console.log(err))
}

export const getAllDepartment=()=>{
    return fetch(`${api}/departments`,{
        method:"GET"
    }).then(res=>{
        return res.json()}
    ).catch(err=>console.log(err))
}

export const removeDepartment=(userId,departmentId,token)=>{
    return fetch(`${api}/department/${departmentId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        res.json()
    }).catch(err=>console.log(err))
}