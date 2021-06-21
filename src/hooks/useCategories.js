import {useEffect, useContext} from 'react';
import CategoryContext from '../context/categories/categoryContext';

const useCategories = () => {

    // Get states and function from categoryContext
    const categoryContext = useContext(CategoryContext);
    const {categories ,getCategories } = categoryContext;

    // Check shop
    useEffect(() => {
        if(categories.length === 0){
            getCategories(localStorage.getItem('shopId'));
        }
    // eslint-disable-next-line
    }, [categories])

    return categories;
};

export default useCategories;