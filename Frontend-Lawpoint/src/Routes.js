import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Signin from './auth/Signin';
import Signup from './auth/signup';
import Case from './core/cases';
import Laws from './core/laws';
import Lawyer from './core/lawyer';
import Menubar from './core/menubar';

import { UserProfile } from './user/User';
import { AdminProfile } from './admin/Admin';
import { LawyerProfile } from './lawyer/Lawyer';
import { signout } from './auth/helper/credential';
import AdminRoutes from './auth/helper/AdminRoutes';
import { AddDepartment } from './admin/addDepartment';
import { ManageDepartment } from './admin/manageDepartment';
import { Cases } from './user/cases';
import UserRoutes from './auth/helper/UserRoutes';
import { PrivateRoute } from './auth/helper/privateRoute';
import { ManageCase } from './core/ManageCase';

const Routes=()=> {
    return (
        <Router>
            <Menubar/>
            <Switch>
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signout" exact component={signout} />


                <Route path="/" exact component={Laws} />
                <Route path="/cases" exact component={Case} />
                <Route path="/lawyer" exact component={Lawyer} />
                <Route path="/profile/user" exact component={UserProfile} />
                <Route path="/profile/lawyer" exact component={LawyerProfile} />
            
                <PrivateRoute path="/manage/cases" exact component={ManageCase} />
                <AdminRoutes  path="/profile/admin" exact component={AdminProfile}/>
                <AdminRoutes  path="/admin/create/department" exact component={AddDepartment}/>
                <AdminRoutes  path="/admin/manage/department" exact component={ManageDepartment}/>

                <UserRoutes path="/create/cases" exact component={Cases} />
            </Switch>
        </Router>
    )
}
export default Routes;
