import React from 'react'
import Base from './base';

const Laws=()=>{
    return (
        <div>
            <Base title="LAWS" description="SEARCH FOR A AVAILABLE LAWS" />
            <div container="Container row">
                <div className="col-6 offset-5">
                <form>
                    <input type="text" value="" placeholder="Search for law" className="shadow"/>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Laws; 