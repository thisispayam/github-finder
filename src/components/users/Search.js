import React, { useState , useContext} from 'react'; //rce snippet
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = (props) =>  {
    const githubContext = useContext(GithubContext);
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
            githubContext.searchUsers(text);
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
                {githubContext.users.length > 0 && (
                    <button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>Clear</button>      
                )}
                         
            </div>

        )
    }

Search.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default Search
