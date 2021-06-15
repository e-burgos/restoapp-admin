import {
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    GET_CATEGORIES,
    FILTER_CATEGORIES,
    PRODUCTS_ERROR,
    CLEAR_PRODUCTS_MESSAGE
} from '../../types'

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [action.payload.data, ...state.categories],
                successMsg: action.payload.msg
            };
        case UPDATE_CATEGORY:
            return {
                ...state,
                categories: action.payload.updateCategories,
                successMsg: action.payload.msg
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: action.payload.updateCategories,
                successMsg: action.payload.msg
            };
        case FILTER_CATEGORIES:
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                activeCategories: action.payload.filter(category => category.status === 'active')
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