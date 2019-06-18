import React, { useReducer } from 'react';
import uuid from 'uuid/v4';

import AlertContext from './alertContext';
import AlertReducer from './AlertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set alert
    const setAlert = (type, msg, timeout = 3000) => {
        const id = uuid();
        dispatch({ type: SET_ALERT, payload: { type, msg, id } });

        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT, payload: id });
        }, timeout);
    };

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
