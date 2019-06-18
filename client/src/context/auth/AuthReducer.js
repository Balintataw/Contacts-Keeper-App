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
        case LOGIN_SUCCESS:
            console.log('REG<LOGIN SUCCESS', payload);
            localStorage.setItem('token', payload);
            return {
                ...state,
                token: payload,
                isAuth: true,
                loading: false,
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            console.log('FAILURE');
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
            console.log('USER_LOADED REDUCER', payload);
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: payload,
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
