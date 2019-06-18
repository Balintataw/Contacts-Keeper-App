import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    START_LOADING,
} from '../types';

export default (state, { type, payload }) => {
    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload);
            return {
                ...state,
                token: payload,
                isAuth: true,
                loading: false,
            };
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false,
                user: null,
                error: payload,
            };
        case START_LOADING:
            return {
                ...state,
                loading: true,
            };
        case USER_LOADED:
            console.log('USER_LOADED', payload);
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: payload,
            };
        case AUTH_ERROR:
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false,
                user: null,
                error: payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
            };
        case LOGIN_FAIL:
            return {
                ...state,
            };
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false,
                user: null,
                error: null,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
