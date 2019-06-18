import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import ContactState from './context/contact/ContactState';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';

import Home from './components/pages/Home';
import Login from './components/auth/Login';
import About from './components/pages/About';
import Alerts from './components/layouts/Alerts';
import Navbar from './components/layouts/Navbar';
import Register from './components/auth/Register';
import ProtectedRoute from './components/routing/ProtectedRoute';

import { setAuthToken } from './utils';
if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
}

const App = () => {
    return (
        <AuthState>
            <ContactState>
                <AlertState>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <div className='container'>
                                <Alerts />
                                <Switch>
                                    <ProtectedRoute
                                        exact
                                        path='/'
                                        component={Home}
                                    />
                                    <Route
                                        exact
                                        path='/about'
                                        component={About}
                                    />
                                    <Route
                                        exact
                                        path='/register'
                                        component={Register}
                                    />
                                    <Route
                                        exact
                                        path='/login'
                                        component={Login}
                                    />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertState>
            </ContactState>
        </AuthState>
    );
};

export default App;
