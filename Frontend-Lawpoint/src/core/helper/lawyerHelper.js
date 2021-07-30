const api="http://localhost:8000/api"
export const getLawyer = () => {
    return fetch(`${api}/lawyers`,{
        method:"GET"
    }).then(res=>(res.json())
    ).catch(err=>console.log(err))
    
}
