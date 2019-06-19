import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';

import Spinner from '../layouts/Spinner';
import ContactItem from './ContactItem';

const Contacts = () => {
    const { contacts, filtered, getContacts, loading } = useContext(
        ContactContext
    );

    useEffect(() => {
        getContacts();
        console.log('CALL getContacts()', contacts, loading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4 style={{ textAlign: 'center' }}>Please add a contact</h4>;
    }
    if (!loading && contacts !== null) {
        return (
            <div
                style={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    height: '70vh',
                }}
            >
                <TransitionGroup>
                    {filtered
                        ? filtered.map(contact => (
                              <CSSTransition
                                  key={contact._id}
                                  timeout={500}
                                  classNames='fade'
                              >
                                  <ContactItem {...contact} />
                              </CSSTransition>
                          ))
                        : contacts.map(contact => (
                              <CSSTransition
                                  key={contact._id}
                                  timeout={500}
                                  classNames='fade'
                              >
                                  <ContactItem {...contact} />
                              </CSSTransition>
                          ))}
                </TransitionGroup>
            </div>
        );
    } else {
        return <Spinner />;
    }
};

export default Contacts;
