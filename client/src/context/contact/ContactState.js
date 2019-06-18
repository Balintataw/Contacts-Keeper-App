import React, { useReducer } from 'react';
import uuid from 'uuid/v4';
import ContactContext from './contactContext';
import ContactReducer from './ContactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Biff Tannen',
                email: 'Biff@email.com',
                phone: '123-123-1234',
                type: 'personal',
            },
            {
                id: 2,
                name: 'Biffy Tannen',
                email: 'Biff@email.com',
                phone: '123-123-1234',
                type: 'professional',
            },
            {
                id: 3,
                name: 'Biffo Tannen',
                email: 'Biff@email.com',
                phone: '123-123-1234',
                type: 'personal',
            },
        ],
        current: null,
        filtered: null,
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact
    const addContact = contact => {
        contact.id = uuid;
        dispatch({ type: ADD_CONTACT, payload: contact });
    };
    // Delete Contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };
    // Set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };
    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    // update contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
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
                addContact,
                deleteContact,
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
