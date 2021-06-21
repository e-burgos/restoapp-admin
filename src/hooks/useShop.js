import {useEffect, useContext} from 'react';
import ShopContext from '../context/shops/shopContext';

const useShop = () => {

    //Get state and function to verified if exist a current shop
    const shopContext = useContext(ShopContext);
    const { currentShop, getCurrentShop } = shopContext;

    // Check shop
    useEffect(() => {
        if(currentShop.uid === null){
            getCurrentShop(localStorage.getItem('userId'));
        }
    // eslint-disable-next-line
    }, [currentShop])

    return currentShop;
};

export default useShop;