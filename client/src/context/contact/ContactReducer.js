import {
    ADD_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    DELETE_CONTACT,
    START_LOADING,
    CONTACT_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
} from '../types';

export default (state, { type, payload }) => {
    switch (type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: payload,
                loading: false,
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [payload, ...state.contacts],
                loading: false,
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact._id !== payload
                ),
                loading: false,
            };
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: [],
                filtered: [],
                error: null,
                current: null,
            };
        case START_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case SET_CURRENT:
            return {
                ...state,
                current: payload,
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact._id === payload._id ? payload : contact
                ),
                loading: false,
            };
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${payload}`, 'gi');
                    return (
                        contact.name.match(regex) || contact.email.match(regex)
                    );
                }),
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };
        default:
            return state;
    }
};
