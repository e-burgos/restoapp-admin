import React, {useReducer} from 'react';
import ShopContext from './shopContext';
import shopReducer from './shopReducer';
import 'firebase/firestore';
import { useFirebaseApp } from 'reactfire';
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
    CLEAR_SHOP
} from '../../types'

const ShopState = props => {

    // Call Hooks
    const firebase = useFirebaseApp();

    // Initial shop object
    const initialShop = {
        id: null,
        uid: null,
        status: null,
        shopName: null,
        address: null,
        phone: null,
        email: null,
        logoURL: null,
        description: null,
        whatsapp: null,
        twitter: null,
        instagram: null,
        facebook: null,
    }

    const initialState = {
        shops: [],
        currentShop: initialShop,
        successShopMsg: '',
        errorShopMsg: '',
    };

    const [state, dispatch] = useReducer(shopReducer, initialState);

    // Add one shop in storage
    const addShop = async data => {
        try {
            const shop = await firebase.firestore().collection('shops').add(data);
            data.id = shop.id;
            console.log(data)
            const info = {data, msg: 'Comercio agregado correctamente'};
            dispatch({
                type: ADD_SHOP,
                payload: info,
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: SHOPS_ERROR,
                payload: {
                    msg: "Ocurrió un error al agregar un comercio, por favor intente nuevamente",
                    currentShop: initialShop
                }
            });
        };
    };

    // Admin add one shop in storage
    const adminAddShop = async data => {
        try {
            const shop = await firebase.firestore().collection('shops').add(data);
            data.id = shop.id;
            console.log(data)
            const info = {data, msg: 'Comercio agregado correctamente'};
            dispatch({
                type: ADMIN_ADD_SHOP,
                payload: info,
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: SHOPS_ERROR,
                payload: {
                    msg: "Ocurrió un error al agregar un comercio, por favor intente nuevamente",
                    currentShop: initialShop
                }
            });
        };
    };

    // Update one shop in storage
    const updateShop = async data => {
        try {
            await firebase.firestore().collection('shops').doc(data.id).update(data);
            console.log(data);
            const info = {data, msg: 'Comercio actualizado correctamente'};
            dispatch({
                type: UPDATE_SHOP,
                payload: info
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: SHOPS_ERROR,
                payload: {
                    msg: "Ocurrió un error al actualizar un comercio, por favor intente nuevamente",
                    currentShop: initialShop
                }
            })
        }
    };

    // Admin update shop in storage
    const adminUpdateShop = async data => {
        try {
            await firebase.firestore().collection('shops').doc(data.id).update(data);

            let updateShops = state.shops.filter(shop => shop.id !== data.id);
            updateShops.push(data);
            updateShops.sort(dynamicSort("shopName", 1))

            const info = {updateShops, msg: 'Comercio actualizado correctamente'};
            dispatch({
                type: ADMIN_UPDATE_SHOP,
                payload: info
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: SHOPS_ERROR,
                payload: {
                    msg: "Ocurrió un error al actualizar un comercio, por favor intente nuevamente",
                    currentShop: initialShop
                }
            })
        }
    };

    // Delete one shop in storage
    const adminDestroyShop = async data => {
        console.log(data.id)
        try {
            await firebase.firestore().collection('shops').doc(data.id).delete();
            await firebase.firestore().collection('products').where('shopId', '==', data.id).delete();
            await firebase.firestore().collection('categories').where('shopId', '==', data.id).delete();

            let updateShops = state.shops.filter(shop => shop.id !== data.id);
            updateShops.sort(dynamicSort("shopName", 1))

            const info = {updateShops, msg: 'Comercio eliminado correctamente'};
            dispatch({
                type: ADMIN_DELETE_SHOP,
                payload: info
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: SHOPS_ERROR,
                payload: {
                    msg: "Ocurrió un error al eliminar un comercio, por favor intente nuevamente",
                    currentShop: initialShop
                }
            })
        }
    };

    // Filter shops
    const filterShops = (word) => {
        let filterArray = state.shops.filter(shop => 
            shop.shopName.includes(word) ||
            shop.address.includes(word)  ||
            shop.phone.includes(word)    ||
            shop.status.includes(word)
        );
        dispatch({
            type: FILTER_SHOPS,
            payload: filterArray
        })
    }

    // Get all shops
    const getShops = () => {
        const shopsRef = firebase.firestore().collection('shops');
        shopsRef.onSnapshot(handleSnapshotShops)
    };
    function handleSnapshotShops(snapshot){
        const shops = snapshot.docs.map(doc => {
            return ({
                id: doc.id,
                ...doc.data()
            });
        });
        shops.sort(dynamicSort("shopName", 1));
        dispatch({
            type: GET_SHOPS,
            payload: shops
        });
    };

    // Get user shop
    const getCurrentShop = (userId) => {
        const shopsRef = firebase.firestore().collection('shops');
        const query = shopsRef.where('uid', '==', userId);
        query.onSnapshot(handleSnapshot)
    };

    function handleSnapshot(snapshot){
        let shop = snapshot.docs.map(doc => {
            return ({
                id: doc.id,
                ...doc.data()
            });
        });

        if(shop.length === 0){
            shop = initialShop;
        } else {
            shop = shop[0];
        };

        dispatch({
            type: GET_SHOP,
            payload: shop
        });
    };

    // Clear all alerts
    const clearShopMessage = () => {
        dispatch({
            type: CLEAR_SHOPS_MESSAGE,
        })
    };
    
    // Sort array
    function dynamicSort(property, order) {
        const sortOrder = order;
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    };

    // clear currentShop state
    const clearShop = () => {
        dispatch({
            type: CLEAR_SHOP,
            payload: initialShop
        })
    }


    return ( 
        <ShopContext.Provider
            value={{
                shops: state.shops,
                currentShop: state.currentShop,
                successShopMsg: state.successShopMsg,
                errorShopMsg: state.errorShopMsg,
                addShop,
                adminAddShop,
                updateShop,
                adminUpdateShop,
                adminDestroyShop,
                clearShopMessage,
                getShops,
                getCurrentShop,
                filterShops,
                clearShop,
            }}
        >
            {props.children}
        </ShopContext.Provider>
    );
}
 
export default ShopState;