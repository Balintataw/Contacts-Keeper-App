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
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact
    // Delete Contact
    // Set current contact
    // Clear current contact
    // update contact
    // filter contacts
    // clear filter
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
