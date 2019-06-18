import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { validateForm } from '../../utils';

const Login = props => {
    const { setAlert } = useContext(AlertContext);
    const { login, error, clearErrors, isAuth } = useContext(AuthContext);

    useEffect(() => {
        if (isAuth) {
            props.history.push('/');
        }
        if (error) {
            setAlert('danger', error);
            clearErrors();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isAuth, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const { email, password } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const { valid, msg } = validateForm(user);
        if (!valid) {
            setAlert('danger', msg);
            return;
        }
        login(user);
        console.log('USER', user);
    };

    return (
        <div className='form-container'>
            <h1 className='text-center'>
                Account
                <span className='text-primary pl'>Login</span>
            </h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className='btn btn-primary btn-block'
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default withRouter(Login);
