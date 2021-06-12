import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    // REGISTRATION_SUCCESS,
    // REGISTRATION_ERROR,
    LOGOUT,
    CLEAR_MESSAGE,
    GET_USER,
    REGISTRATION_ERROR,
    REGISTRATION_SUCCESS,
    FORGOT_PASSWORD
} from '../../types';

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case GET_USER:
        case REGISTRATION_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                auth: true,
                user: action.payload.currentUser,
                authMsg: action.payload.msg,
                loading: false
            };
        case REGISTRATION_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                auth: false,
                user: null,
                errorMsg: action.payload,
                loading: false
            };
        case LOGOUT:
            return {
                ...state,
                auth: false,
                user: null,
                authMsg: '',
                errorMsg: '',
                loading: false
            };
        case FORGOT_PASSWORD:
            return {
                ...state,
                auth: false,
                user: null,
                authMsg: action.payload,
                loading: false
            };
        case CLEAR_MESSAGE:
            return {
                ...state,
                authMsg: '',
                errorMsg: '',
            };
        default:
            return state;
    }
}

