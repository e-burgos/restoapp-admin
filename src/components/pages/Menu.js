import React from 'react';
import useAuth from '../../hooks/useAuth';
import Sidebar from '../ui/sidebar/Sidebar';
import Header from '../ui/header/Header';
import Category from '../menu/Category';
import CreateShopCard from '../cards/CreateShopCard';
import useShop from '../../hooks/useShop';
import useActiveCategories from '../../hooks/useActiveCategories';

const Menu = () => {

    // Verified if exist a user login
    useAuth();

    // Hooks
    const currentShop = useShop();
    const activeCategories = useActiveCategories();

    return ( 
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <Header/>  
                <main className="h-full pb-16 overflow-y-auto"> 
                    <div className="container px-6 mx-auto grid">
                        <div className="flex flex-col items-center my-8">
                            <h1 className="text-3xl font-bold uppercase text-gray-700 dark:text-gray-200">Menu</h1>  
                            <span className="mr-2 ml-2 text-xl my-2 border-purple-300 border w-10"></span>
                            <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Categorías y productos disponibles en la carta</h4>
                        </div>
                        {currentShop.id === null ?
                            <CreateShopCard/>
                        : null}
                        
                        {activeCategories.length !== 0 ? activeCategories.map(category => (
                            <Category
                                key={category.id}
                                category={category}
                            />
                        )) : null}
                    </div>   
                </main> 
            </div>
        </div>
     );
}
 
export default Menu;