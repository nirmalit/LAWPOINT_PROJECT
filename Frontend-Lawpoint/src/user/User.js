import React from 'react'
import Base from './../core/base';
import { Link } from 'react-router-dom';
import { isauthenticated } from './../auth/helper/credential';

export const UserProfile = () => {
    const {user:{name,email,role}}=isauthenticated();
    return (
        <div>
            <Base title="Dashboard" description="Manage your Query"/>
            <div className="container">
                <div className="row mt-5">
                <div className="col-6 offset-1">
                    <ul className="card-body text-center  shadow rounded">
                        <li className="list-group-item ">
                            <Link to="/create/cases" className="nav-link">
                            Create Cases
                            </Link>
                            <Link to="/manage/cases" className="nav-link">
                            Manage cases
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-4 card-text ">
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
        </div>
    )
}
