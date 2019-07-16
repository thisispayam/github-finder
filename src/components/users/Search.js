import React, { useState } from 'react'; //rce snippet
import PropTypes from 'prop-types';

const Search = (props) =>  {
   const [text, setText] = useState('');

    const changeHandler = (e) => {
        setText(e.target.value);
        props.setAlert(null, null);

    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(text === ''){
            props.setAlert('Please enter something!', 'danger');
        }else{
            props.searchUsers(text); // passing up the state
            setText('');
            props.setAlert(null, 'danger');
        }
        
    }

        return (
            <div>
                <form className="form" onSubmit={submitHandler}>
                    <input type="text" name="text" placeholder="Search users..." onChange={changeHandler} value={text} />
                    <button className='btn btn-dark btn-block'>Search</button>
                </form>
                {props.showClear && (
                    <button className='btn btn-light btn-block' onClick={props.clearUsers}>Clear</button>      
                )}
                         
            </div>

        )
    }

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}

export default Search
