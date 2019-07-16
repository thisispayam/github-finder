import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USER,
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
                alert: null
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false,
                alert: null
            }
        case SET_LOADING :
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}