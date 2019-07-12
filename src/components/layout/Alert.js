import React from 'react'

const Alert = ({alert}) => { // alert is an object with msg and type
     return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className='fas fa-info-circle' /> {alert.msg}
            </div>
        )
    );
}

export default Alert;