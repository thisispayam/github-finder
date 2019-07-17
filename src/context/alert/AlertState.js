import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

// initial global state

const AlertState = (props) => {
    const initialState = null;
    const [state, dispatch] = useReducer(AlertReducer, initialState);

 // Set Alert
 const setAlert = (msg, type) => {
     if (msg === null || type === null) {
         dispatch({
             type: REMOVE_ALERT
         });
     } else {
         dispatch({
             type: SET_ALERT,
             payload: { msg, type }
         });
     }
     

 }


    //providing these props for the entire app
    return (
        <AlertContext.Provider value={{ alert: state, setAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
}
export default AlertState;