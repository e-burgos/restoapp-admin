import {useEffect, useContext} from 'react';
import ProductContext from '../context/products/productContext';

const useActiveProducts = () => {

    // Get states and function from productContext
    const productContext = useContext(ProductContext);
    const {activeProducts ,getActiveProducts } = productContext;

    // Check products
    useEffect(() => {
        if(activeProducts.length === 0){
            getActiveProducts(localStorage.getItem('shopId'));
        }
    // eslint-disable-next-line
    }, [activeProducts])

    return activeProducts;
};

export default useActiveProducts;