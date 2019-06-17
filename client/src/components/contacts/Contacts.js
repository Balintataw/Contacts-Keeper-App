import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

import ContactItem from './ContactItem';
const Contacts = () => {
    const { contacts } = useContext(ContactContext);
    return (
        <Fragment>
            {contacts.map(contact => (
                <ContactItem {...contact} key={contact.id} />
            ))}
        </Fragment>
    );
};

export default Contacts;
