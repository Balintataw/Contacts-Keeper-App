import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import AuthReducer from './AuthReducer';

import { setAuthToken } from '../../utils';

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

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuth: null,
        user: null,
        loading: false,
        error: null,
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Loaded user
    const loadUser = async () => {
        dispatch({ type: START_LOADING });
        const token = localStorage.getItem('token');
        if (token) {
            // load token into global axios header
            setAuthToken(token);
        }
        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (err) {
            console.error('Error creating user', err);
            dispatch({ type: AUTH_ERROR, payload: err.response.data.msg });
        }
    };
    //Register user
    const register = async formData => {
        dispatch({ type: START_LOADING });
        const config = {
            headers: {
                'Context-Type': 'application/json',
            },
        };
        try {
            const res = await axios.post('/api/users/', formData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
            loadUser();
        } catch (err) {
            console.error('Error creating user', err);
            dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
        }
    };
    //Login User
    const login = () => {};
    //Logout
    const logout = () => {
        dispatch({ type: LOGOUT });
    };
    //Clear Errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuth: state.isAuth,
                user: state.user,
                loading: state.loading,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
