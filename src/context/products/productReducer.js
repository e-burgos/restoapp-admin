import {
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCTS,
    GET_ACTIVE_PRODUCTS,
    FILTER_PRODUCTS,
    PRODUCTS_ERROR,
    CLEAR_PRODUCTS_MESSAGE
} from '../../types'

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                successMsg: action.payload.msg
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: action.payload.updateProducts,
                successMsg: action.payload.msg
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: action.payload.updateProducts,
                successMsg: action.payload.msg
            };
        case FILTER_PRODUCTS:
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            }; 
        case GET_ACTIVE_PRODUCTS:
            return {
                ...state,
                activeProducts: action.payload,
            }; 
        case PRODUCTS_ERROR:
            return {
                ...state,
                errorMsg: action.payload,
            };    
        case CLEAR_PRODUCTS_MESSAGE:
            return {
                ...state,
                successMsg: '',
                errorMsg: '',
            };    
        default:
            return state    
    };
};