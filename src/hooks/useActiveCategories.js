import {useEffect, useContext} from 'react';
import CategoryContext from '../context/categories/categoryContext';

const useActiveCategories = () => {

    // Get states and function from categoryContext
    const categoryContext = useContext(CategoryContext);
    const {activeCategories ,getActiveCategories } = categoryContext;

    // Check shop
    useEffect(() => {
        if(activeCategories.length === 0){
            getActiveCategories(localStorage.getItem('shopId'));
        }
    // eslint-disable-next-line
    }, [activeCategories])

    return activeCategories;
};

export default useActiveCategories;