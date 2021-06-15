import React, {useReducer} from 'react';
import ProductContext from './productContext';
import productReducer from './productReducer';
import 'firebase/firestore';
import { useFirebaseApp } from 'reactfire';
import {
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCTS,
    FILTER_PRODUCTS,
    PRODUCTS_ERROR,
    CLEAR_PRODUCTS_MESSAGE,
} from '../../types'

const ProductState = props => {

    // Call Hooks
    const firebase = useFirebaseApp();

    const initialState = {
        products: [],
        activeProducts: [],
        successMsg: '',
        errorMsg: '',
    };

    const [state, dispatch] = useReducer(productReducer, initialState);

    // Add one product in storage
    const addProduct = async data => {
        try {
            const product = await firebase.firestore().collection('products').add(data);
            data.id = product.id;
            const info = {data, msg: 'Producto agregado correctamente'};
            dispatch({
                type: ADD_PRODUCT,
                payload: info,
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: PRODUCTS_ERROR,
                payload: "Ocurrió un error al agregar un producto, por favor intente nuevamente"
            })
        }
    };

    // Update one product in storage
    const updateProduct = async data => {
        try {
            await firebase.firestore().collection('products').doc(data.id).update(data);

            let updateProducts = state.products.filter(product => product.id !== data.id);
            updateProducts.push(data);
            updateProducts.sort(dynamicSort("productName", 1))

            const info = {updateProducts, msg: 'Producto actualizado correctamente'};
            dispatch({
                type: UPDATE_PRODUCT,
                payload: info
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: PRODUCTS_ERROR,
                payload: "Ocurrió un error al actualizar un producto, por favor intente nuevamente"
            })
        }
    };

    // Delete one product in storage
    const destroyProduct = async data => {
        console.log(data.id)
        try {
            await firebase.firestore().collection('products').doc(data.id).delete();

            let updateProducts = state.products.filter(product => product.id !== data.id);
            updateProducts.sort(dynamicSort("productName", 1))

            const info = {updateProducts, msg: 'Producto eliminado correctamente'};
            dispatch({
                type: DELETE_PRODUCT,
                payload: info
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: PRODUCTS_ERROR,
                payload: "Ocurrió un error al eliminar un producto, por favor intente nuevamente"
            })
        }
    };

    // Filter products
    const filterProducts = (word) => {
        let filterArray = state.products.filter(product => product.productName.includes(word));
        dispatch({
            type: FILTER_PRODUCTS,
            payload: filterArray
        })
    }

    // Get all products
    const getProducts = async (userId) => {
        let products = [];
        const productsRef = await firebase.firestore().collection('products');
        const snapshot = await productsRef.where('uid', '==', userId).get();
        snapshot.forEach(doc => {
            let {productName, price, stock, status, description, image, uid, category, categoryId} = doc.data();
            products.push({id: doc.id, productName, price, stock, status, description, image, uid, category, categoryId});
        });
        products.sort(dynamicSort("productName", 1))
        dispatch({
            type: GET_PRODUCTS,
            payload: products
        })
    };

    // Clear all alerts
    const clearMessage = () => {
        dispatch({
            type: CLEAR_PRODUCTS_MESSAGE,
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


    return ( 
        <ProductContext.Provider
            value={{
                products: state.products,
                activeProducts: state.activeProducts,
                successMsg: state.successMsg,
                errorMsg: state.errorMsg,
                addProduct,
                updateProduct,
                destroyProduct,
                clearMessage,
                getProducts,
                filterProducts,
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
}
 
export default ProductState;