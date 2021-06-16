import React, {useReducer} from 'react';
import CategoryContext from './categoryContext';
import categoryReducer from './categoryReducer';
import 'firebase/firestore';
import { useFirebaseApp } from 'reactfire';
import {
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    FILTER_CATEGORIES,
    GET_CATEGORIES,
    PRODUCTS_ERROR,
    CLEAR_PRODUCTS_MESSAGE,
} from '../../types'

const CategoryState = props => {

    // Call Hooks
    const firebase = useFirebaseApp();

    const initialState = {
        categories: [],
        activeCategories: [],
        successMsg: '',
        errorMsg: '',
    };

    const [state, dispatch] = useReducer(categoryReducer, initialState);

    // Add one category in storage
    const addCategory = async data => {
        try {
            const category = await firebase.firestore().collection('categories').add(data);
            data.id = category.id;
            const info = {data, msg: 'Categoría agregada correctamente'};
            dispatch({
                type: ADD_CATEGORY,
                payload: info,
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: PRODUCTS_ERROR,
                payload: "Ocurrió un error al agregar una categoría, por favor intente nuevamente"
            })
        }
    };

    // Update one category in storage
    const updateCategory = async data => {
        try {
            await firebase.firestore().collection('categories').doc(data.id).update(data);

            let updateCategories = state.categories.filter(category => category.id !== data.id);
            updateCategories.push(data);
            updateCategories.sort(dynamicSort("categoryName", 1))

            const info = {updateCategories, msg: 'Categoría actualizada correctamente'};
            dispatch({
                type: UPDATE_CATEGORY,
                payload: info
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: PRODUCTS_ERROR,
                payload: "Ocurrió un error al actualizar una categoría, por favor intente nuevamente"
            })
        }
    };

    // Delete one category in storage
    const destroyCategory = async data => {
        console.log(data.id)
        try {
            await firebase.firestore().collection('categories').doc(data.id).delete();

            let updateCategories = state.categories.filter(category => category.id !== data.id);
            updateCategories.sort(dynamicSort("categoryName", 1))

            const info = {updateCategories, msg: 'Categoría eliminada correctamente'};
            dispatch({
                type: DELETE_CATEGORY,
                payload: info
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: PRODUCTS_ERROR,
                payload: "Ocurrió un error al eliminar una categoría, por favor intente nuevamente"
            })
        }
    };

    // Filter categories
    const filterCategories = (word) => {
        let filterArray = state.categories.filter(category => category.categoryName.includes(word));
        dispatch({
            type: FILTER_CATEGORIES,
            payload: filterArray
        })
    }

    // Get all categories
    const getCategories = (userId) => {
        const productsRef = firebase.firestore().collection('categories');
        const query = productsRef.where('uid', '==', userId);
        query.onSnapshot(handleSnapshot)
    };

    function handleSnapshot(snapshot){
        const categories = snapshot.docs.map(doc => {
            return ({
                id: doc.id,
                ...doc.data()
            });
        });
        categories.sort(dynamicSort("categoryName", 1));
        dispatch({
            type: GET_CATEGORIES,
            payload: categories
        });
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
        <CategoryContext.Provider
            value={{
                categories: state.categories,
                activeCategories: state.activeCategories,
                successMsg: state.successMsg,
                errorMsg: state.errorMsg,
                addCategory,
                updateCategory,
                destroyCategory,
                getCategories,
                filterCategories,
                clearMessage,
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
}
 
export default CategoryState;