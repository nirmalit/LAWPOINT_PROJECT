import React from 'react';

export const Lawyercard = ({lawyer}) => {
    return (
        <div className="container card shadow mb-3 ">
            <h2 className="card-header">{lawyer.name}</h2>
            <div className="row offset-2 card-body">
                <div className="col-5 card shadow">
                    <h4 className="card-header" >Location</h4>
                    <p>{lawyer.city}</p>
                    <p>{lawyer.state}</p>
                    <p>{lawyer.pincode}</p>
                </div>
                <div className="col-5 card shadow">
                <h4 className="card-header" >Contact</h4>
                    <p>{lawyer.email}</p>
                    <p>{lawyer.phone}</p>
                </div>
            </div>
        </div>
    )
}
