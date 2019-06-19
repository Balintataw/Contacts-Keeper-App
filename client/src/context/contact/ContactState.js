import React, { useReducer } from 'react';
import axios from 'axios';

import ContactContext from './contactContext';
import ContactReducer from './ContactReducer';

import {
    ADD_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    START_LOADING,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
        loading: false,
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);
    // Get Contacts
    const getContacts = async () => {
        let tries = 0;
        dispatch({ type: START_LOADING });
        try {
            const res = await axios.get('/api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (error) {
            // for some reason, getContacts gets called before axios headers are being set so retrying
            if (error.response.status === 401 && tries === 0) {
                tries = 1;
                getContacts();
            } else {
                console.error('Error getting contacts', error);
                dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
            }
        }
    };
    // Add Contact
    const addContact = async contact => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (error) {
            console.error('Error adding contact', error);
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
        }
    };
    // update contact
    const updateContact = async contact => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        try {
            const res = await axios.put(
                `/api/contacts/${contact._id}`,
                contact,
                config
            );
            dispatch({ type: UPDATE_CONTACT, payload: res.data });
        } catch (error) {
            console.error('Error updating contact', error);
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
        }
    };
    // Delete Contact
    const deleteContact = async _id => {
        try {
            await axios.delete(`/api/contacts/${_id}`);
            dispatch({ type: DELETE_CONTACT, payload: _id });
        } catch (error) {
            console.error('Error deleting contact', error);
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
        }
    };
    // Clear all contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };
    // Set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };
    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    // filter contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };
    // clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                loading: state.loading,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                clearContacts,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
