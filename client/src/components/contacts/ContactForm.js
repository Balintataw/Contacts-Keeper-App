import React, { useContext, useState, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { UPDATE_CONTACT } from '../../context/types';

const ContactForm = () => {
    const initialState = {
        name: '',
        email: '',
        phone: '',
        type: 'personal',
    };
    const [contact, setContact] = useState(initialState);
    const { name, email, phone, type } = contact;
    const { addContact, current, clearCurrent, updateContact } = useContext(
        ContactContext
    );

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact(initialState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);
    const onChange = e =>
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onClear = () => {
        clearCurrent();
    };

    const handleSubmit = () => {
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        setContact(initialState);
    };

    return (
        <div className='form'>
            <h2 className='text-primary'>
                {current ? 'Edit Contact' : 'Add Contact'}
            </h2>
            <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <input
                type='tel'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <div className='flex align-center'>
                <input
                    type='radio'
                    name='type'
                    value='personal'
                    checked={type === 'personal'}
                    onChange={onChange}
                />
                <span className='px'>Personal</span>
                <input
                    type='radio'
                    name='type'
                    value='professional'
                    checked={type === 'professional'}
                    onChange={onChange}
                />
                <span className='pl'>Professional</span>
            </div>
            <div>
                <button
                    onClick={handleSubmit}
                    className='btn btn-primary btn-block'
                >
                    {current ? 'Update Contact' : 'Add Contact'}
                </button>
            </div>
            {current && (
                <div>
                    <button
                        onClick={onClear}
                        className='btn btn-light btn-block mt-1'
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
};

export default ContactForm;
