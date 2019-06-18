import axios from 'axios';

export const validateForm = data => {
    for (let item in data) {
        if (data[item] === '') {
            return { valid: false, msg: 'Missing Required Field' };
        }
        if (item === 'password' && data[item].length < 6) {
            return {
                valid: false,
                msg: 'Password must be at least 6 characters',
            };
        }
        if (item === 'passwordConfirm' && data['password'] !== data[item]) {
            return {
                valid: false,
                msg: 'Passwords do not match',
            };
        }
    }
    return { valid: true, msg: 'Valid' };
};

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};
