import React from 'react'
import {Link,withRouter} from 'react-router-dom';
import { isauthenticated, signout } from './../auth/helper/credential';


const active=(history ,path)=>{
    if(history.location.pathname===path){
        return {color:"black"};
    }else{
        return {color:"white"};
    }
}
const Menubar=({history})=> {
    return (
        <div className="basecolour mb-3">
            <div className="container">
                    <ul className="nav nav-tabs">
                        <li  className="nav-item">
                             <Link style={active(history,"/")} className="nav-link" to="/">
                                LAWS
                            </Link>
                        </li>
                        <li  className="nav-item">
                             <Link  style={active(history,"/cases")}  className="nav-link" to="/cases">
                                CASES
                            </Link>
                        </li>
                        <li className="nav-item">
                             <Link  style={active(history,"/lawyer")} className="nav-link" to="/lawyer">
                                LAWYER
                            </Link>
                        </li>
                        {(!isauthenticated())&&(
                            <li className="nav-item">
                             <Link  style={active(history,"/signup")}  className="nav-link" to="/signup">
                               SIGN UP
                            </Link>
                        </li>
                        )}
                        {(!isauthenticated())&&(
                        <li className="nav-item">
                             <Link  style={active(history,"/signin")}   className="nav-link" to="/signin">
                               SIGN IN
                            </Link>
                        </li>
                        )}
                        {(isauthenticated() && isauthenticated().user.role===0)&&(
                        <li className="nav-item">
                             <Link   style={active(history,"/profile/admin")}   className="nav-link" to="/profile/admin">
                               PROFILE
                            </Link>
                        </li>
                        )}
                        {(isauthenticated() && isauthenticated().user.role===1)&&(
                        <li className="nav-item">
                             <Link   style={active(history,"/profile/lawyer")}   className="nav-link" to="/profile/lawyer">
                               PROFILE
                            </Link>
                        </li>
                        )}
                        {(isauthenticated() && isauthenticated().user.role===2)&&(
                        <li className="nav-item">
                             <Link   style={active(history,"/profile/user")}   className="nav-link" to="/profile/user">
                               PROFILE
                            </Link>
                        </li>
                        )}
                        <li  className="nav-item">
                        {(isauthenticated() )&&(
                             <span className="nav-link  text-warning" onClick={()=>{
                                signout(()=>{
                                    history.push("/");
                                    })
                                }}>
                               SIGN OUT
                               </span>
                        )}
                        </li>
                    </ul>
            </div>
        </div>
    )
}

export default withRouter(Menubar);