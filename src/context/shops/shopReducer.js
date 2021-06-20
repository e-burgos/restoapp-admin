import {
    ADD_SHOP,
    ADMIN_ADD_SHOP,
    UPDATE_SHOP,
    ADMIN_UPDATE_SHOP,
    ADMIN_DELETE_SHOP,
    GET_SHOPS,
    GET_SHOP,
    FILTER_SHOPS,
    SHOPS_ERROR,
    CLEAR_SHOPS_MESSAGE,
    CLEAR_SHOP,
} from '../../types'

// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case ADD_SHOP:
            return {
                ...state,
                currentShop: action.payload.data,
                successShopMsg: action.payload.msg
            };
        case ADMIN_ADD_SHOP:
            return {
                ...state,
                shops: [action.payload.data, ...state.shops],
                successShopMsg: action.payload.msg
            };
        case UPDATE_SHOP:
            return {
                ...state,
                currentShop: action.payload.data,
                successShopMsg: action.payload.msg
            };
        case ADMIN_UPDATE_SHOP:
            return {
                ...state,
                shops: action.payload.updateShops,
                successShopMsg: action.payload.msg
            };
        case ADMIN_DELETE_SHOP:
            return {
                ...state,
                shops: action.payload.updateShops,
                successShopMsg: action.payload.msg
            };
        case FILTER_SHOPS:
        case GET_SHOPS:
            return {
                ...state,
                shops: action.payload,
            }; 
        case GET_SHOP:
            return {
                ...state,
                currentShop: action.payload,
            }; 
        case SHOPS_ERROR:
            return {
                ...state,
                currentShop: action.payload.currentShop,
                errorShopMsg: action.payload.msg,
            };    
        case CLEAR_SHOPS_MESSAGE:
            return {
                ...state,
                successShopMsg: '',
                errorShopMsg: '',
            };
        case CLEAR_SHOP:
            return {
                ...state, 
                currentShop: action.payload,
                authMsg: '',
                errorMsg: '',
            }    
        default:
            return state    
    };
};