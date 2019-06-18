import React, { useState, useContext } from 'react';

import AlertContext from '../../context/alert/alertContext';
import { validateForm } from '../../utils';

const Login = () => {
    const { setAlert } = useContext(AlertContext);
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
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={onChange}
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

export default Login;
