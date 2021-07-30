import React from 'react'
import { Route ,Redirect } from 'react-router-dom';
import { isauthenticated } from './credential';

const UserRoutes = ({component: Component,...rest}) => {
    return (
        <Route
            {...rest}
            render={props=>
            isauthenticated() && isauthenticated().user.role===2 ?(
                <Component {...props} />
                ):(
                <Redirect 
                to={{
                    pathname:"/signin",
                    state:{ from :props.location }
                }}
                />
            )
            }
        />
    )
}
export default UserRoutes;