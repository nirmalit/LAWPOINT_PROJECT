const api="http://localhost:8000/api";
export const findUserById=(userId,token)=>{
    return fetch(`${api}/user/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>(res.json())
    ).catch(err=>console.log(err))
}