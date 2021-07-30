import React from 'react'
import { Route ,Redirect } from 'react-router-dom';
import { isauthenticated } from './credential';

const AdminRoutes = ({component: Component,...rest}) => {
    return (
        <Route
            {...rest}
            render={props=>
            isauthenticated() && isauthenticated().user.role===0 ?(
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
export default AdminRoutes;