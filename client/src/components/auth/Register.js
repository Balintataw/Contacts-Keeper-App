import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

import { validateForm } from '../../utils';

const Register = props => {
    const { setAlert } = useContext(AlertContext);
    const { register, error, clearErrors, isAuth } = useContext(AuthContext);

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
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });
    const { name, email, password, passwordConfirm } = user;

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
        register(user);
    };

    return (
        <div className='form-container'>
            <h1 className='text-center'>
                Account
                <span className='text-primary pl'>Register</span>
            </h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
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
                        minLength='6'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='passwordConfirm'>Confirm Password</label>
                    <input
                        type='password'
                        name='passwordConfirm'
                        value={passwordConfirm}
                        onChange={onChange}
                        required
                        minLength='6'
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className='btn btn-primary btn-block'
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
