import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = contact => {
    const { deleteContact, setCurrent, clearCurrent } = useContext(
        ContactContext
    );
    const { id, name, email, phone, type } = contact;

    const onDeleteContact = () => {
        deleteContact(id);
        clearCurrent();
    };

    const onEditContact = () => {
        setCurrent(contact);
    };

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' +
                        (type === 'professional'
                            ? 'badge-success'
                            : 'badge-primary')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {email && (
                    <li>
                        <i className='fas fa-envelope-open' /> {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className='fas fa-phone' /> {phone}
                    </li>
                )}
            </ul>
            <p>
                <button onClick={onEditContact} className='btn btn-dark btn-sm'>
                    Edit
                </button>
                <button
                    onClick={onDeleteContact}
                    className='btn btn-danger btn-sm'
                >
                    Delete
                </button>
            </p>
        </div>
    );
};

ContactItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    type: PropTypes.string.isRequired,
};

export default ContactItem;
