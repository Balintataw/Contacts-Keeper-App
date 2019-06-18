import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuth, loading } = authContext;
    console.log('AUTH_CONTEXT', authContext);

    return (
        <Route
            {...rest}
            render={props =>
                !isAuth && !loading ? (
                    <Redirect to='/login' />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default ProtectedRoute;
