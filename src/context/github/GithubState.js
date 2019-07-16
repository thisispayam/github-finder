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


    // Get User


    // Get Repos


    // Clear Users


    // Set Loading


    //providing these props for the entire app
    return (
        <GithubContext.Provider value={{ users: state.users, user: state.user, repos: state.repos, loading: state.loading, alert: state.alert}}>
        {props.children}
        </GithubContext.Provider>
    );
}
export default GithubState;