import {useEffect, useContext} from 'react';
import ProductContext from '../context/products/productContext';

const useProducts = () => {

    // Get states and function from productContext
    const productContext = useContext(ProductContext);
    const {products ,getProducts } = productContext;

    // Check products
    useEffect(() => {
        if(products.length === 0){
            getProducts(localStorage.getItem('shopId'));
        }
    // eslint-disable-next-line
    }, [products])

    return products;
};

export default useProducts;