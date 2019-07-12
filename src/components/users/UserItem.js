import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const UserItem = (props) => {
        const { login,avatar_url } = props.user;
             
        return (
            <div className="card text-center">
                <img className="round-img" src={avatar_url} alt={login} style={{ width: "100px" }} />
                <h5>{login}</h5>
                <div>
                    <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">more</Link>
                </div>
            </div>
        )
    
}
UserItem.propTypes = {
    user: PropTypes.object.isRequired, //ptor snippet 
}

export default UserItem
