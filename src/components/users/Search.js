import React, { useState , useContext} from 'react'; //rce snippet
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';


const Search = () =>  {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

   const [text, setText] = useState('');

    const changeHandler = (e) => {
        setText(e.target.value);
        alertContext.setAlert(null, null);

    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(text === ''){
            alertContext.setAlert('Please enter something!', 'danger');
        }else{
            githubContext.searchUsers(text);
            setText('');
            alertContext.setAlert(null, 'danger');
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


export default Search
