import React, {useContext} from 'react'
import AlertContext from '../../context/alert/alertContext';

const Alert = () => { // alert is an object with msg and type
    const  alertContext = useContext(AlertContext);
    
    //destructure the alertContext.alert
    const {alert} = alertContext;
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className='fas fa-info-circle' /> {alert.msg}
            </div>
        )
    );
}

export default Alert;