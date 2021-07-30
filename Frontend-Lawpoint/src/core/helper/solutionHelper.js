const api="http://localhost:8000/api";
export const addSolution = (userId,caseId,token,solution) => {
    const body=JSON.stringify({details:solution});
    return fetch(`${api}/solution/${userId}/${caseId}`,{
        method:"POST",
        headers:{
            Authorization:`Bearer ${token}`,
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body:body
    }).then((res)=>(res.json())
    ).catch(err=>console.log(err))
}
export const getSolution=(userId,solutionId,token)=>{
    return fetch(`${api}/solution/${userId}/${solutionId}`,
    {
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`,
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        return res.json()
    }).catch(err=>console.log(err))
}
