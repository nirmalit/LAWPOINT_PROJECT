import React from 'react'
import Base from './../core/base';
import { Link } from 'react-router-dom';
import { isauthenticated } from './../auth/helper/credential';

export const AdminProfile = () => {
    const {user:{name,email,role}}=isauthenticated();
    return (
        <div>
            <Base title="ADMIN PROFILE" description="Managing the service and User Profile" />
            <div className="row mt-3">
                <div className="col-3 offset-1">
                    <ul className="card-body text-center  shadow rounded">
                        <li className="list-group-item ">
                            <Link to="/admin/create/department" className="nav-link">
                            Create Departments
                            </Link>
                            <Link to="/admin/manage/department" className="nav-link">
                            Manage Departments
                            </Link>
                            <Link to="admin/verify/profile" className="nav-link">
                            Verify Profile
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-7 card-text ">
                    <div className="shadow">
                        <ul className="rounded">
                        <li className="list-group-item d-flex flex-row">
                            <span className="badge badge-success text-dark p-2">Name</span>{name}
                        </li>
                        <li className="list-group-item d-flex flex-row">
                            <span className="badge badge-success text-dark p-2">Email</span>{email}
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
