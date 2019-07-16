import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER,
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

// initial global state

const GithubState = (props) => {
    const initialState = {
        user: [],
        user:{},
        repos:[],
        loading: false,
        alert: null
    }


    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //Search Users
    const searchUsers = async text => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });

        // setAlert(null);
    }

    // Get User

 
    // Get Repos


    // Clear Users


    // Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    //providing these props for the entire app
    return (
        <GithubContext.Provider value={{ users: state.users, user: state.user, repos: state.repos, loading: state.loading, alert: state.alert, searchUsers}}>
        {props.children}
        </GithubContext.Provider>
    );
}
export default GithubState;