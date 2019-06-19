import React, { useContext, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon, history }) => {
    const { logout, isAuth, user } = useContext(AuthContext);
    const { clearContacts } = useContext(ContactContext);

    const onLogout = () => {
        logout();
        clearContacts();
        history.replace('/login');
    };

    const authLinks = (
        <Fragment>
            <li className='pr-1'>Hello {user && user.name}</li>
            <li>
                <a
                    href='#!'
                    // className='btn btn-link'
                    // style={{ color: '#FFF', paddingLeft: '0.5rem' }}
                    onClick={onLogout}
                >
                    <i className='fas fa-sign-out-alt'>
                        <span className='hide-sm'>Logout</span>
                    </i>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className='navbar bg-primary'>
            <h1>
                <Link to='/'>
                    <i className={icon} /> {title}
                </Link>
            </h1>
            <ul>{isAuth ? authLinks : guestLinks}</ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt',
};

export default withRouter(Navbar);
