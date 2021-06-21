import React from 'react';
import useAuth from '../../hooks/useAuth';
import useShop from '../../hooks/useShop';
import Sidebar from '../ui/sidebar/Sidebar';
import Header from '../ui/header/Header';
import CreateShopCard from '../cards/CreateShopCard';

const Orders = () => {

    // Verified if exist a user login
    useAuth();

    // Verified if exist a current shop
    const currentShop = useShop();

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <Header/>  
                <main className="h-full pb-16 overflow-y-auto"> 
                    <div className="container px-6 mx-auto grid">
                        <div className="flex flex-col items-center my-8">
                            <h1 className="text-3xl font-bold uppercase text-gray-700 dark:text-gray-200">Pedidos</h1>  
                            <span className="mr-2 ml-2 text-xl my-2 border-purple-300 border w-10"></span>
                            <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Listado de pedidos en tiempo real</h4>
                        </div>
                        {currentShop.id === null ?
                            <CreateShopCard/>
                        : null}
                    </div>   
                </main> 
            </div>
        </div>
    );
}
 
export default Orders;