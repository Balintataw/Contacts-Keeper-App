import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';

import ContactItem from './ContactItem';
const Contacts = () => {
    const { contacts, filtered } = useContext(ContactContext);

    if (contacts.length === 0) {
        return <h4>Please add a contact</h4>;
    }
    return (
        <Fragment>
            <TransitionGroup>
                {filtered
                    ? filtered.map(contact => (
                          <CSSTransition
                              key={contact.id}
                              timeout={500}
                              classNames='fade'
                          >
                              <ContactItem {...contact} />
                          </CSSTransition>
                      ))
                    : contacts.map(contact => (
                          <CSSTransition
                              key={contact.id}
                              timeout={500}
                              classNames='fade'
                          >
                              <ContactItem {...contact} />
                          </CSSTransition>
                      ))}
            </TransitionGroup>
        </Fragment>
    );
};

export default Contacts;
