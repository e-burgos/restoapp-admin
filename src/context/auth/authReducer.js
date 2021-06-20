import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    CLEAR_MESSAGE,
    GET_USER,
    UPDATE_USER,
    REGISTRATION_ERROR,
    REGISTRATION_SUCCESS,
    FORGOT_PASSWORD,
    AUTH_MSG,
} from '../../types';

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case GET_USER:
        case UPDATE_USER:    
        case REGISTRATION_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('userId', action.payload.currentUser.uid);
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
                user: action.payload.user,
                errorMsg: action.payload.msg,
                loading: false
            };
        case LOGOUT:
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            return {
                ...state,
                auth: false,
                user: action.payload,
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
            case AUTH_MSG:
            return {
                ...state,
                authMsg: action.payload,
            };
        default:
            return state;
    }
}

