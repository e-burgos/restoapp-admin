import React, {useContext, useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import Sidebar from '../ui/sidebar/Sidebar';
import Header from '../ui/header/Header';
import CategoryContext from '../../context/categories/categoryContext';
import ProductContext from '../../context/products/productContext';
import Category from '../menu/Category';



const Menu = () => {

    // Verified if exist a user login
    useAuth();

    // Get states and function from productContext
    const productContext = useContext(ProductContext);
    const { activeProducts ,getProducts } = productContext;

    // Get states and function from categoryContext
    const categoryContext = useContext(CategoryContext);
    const { activeCategories, getCategories } = categoryContext;

    useEffect(() => {
        getProducts(localStorage.getItem('userId'));
        getCategories(localStorage.getItem('userId'));
    // eslint-disable-next-line
}, []); 

    return ( 
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <Header/>  
                <main className="h-full pb-16 overflow-y-auto"> 
                    <div className="container px-6 mx-auto grid">
                        <h1 className="my-6 text-3xl font-semibold text-gray-700 dark:text-gray-200">Menu</h1>  
                        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Categorías y productos disponibles en la carta</h4>
                        <div className="w-full overflow-hidden rounded-lg shadow-xs">
                            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                                {activeCategories.map(category => (
                                    <Category
                                        key={category.id}
                                        category={category}
                                        activeProducts={activeProducts}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>   
                </main> 
            </div>
        </div>
     );
}
 
export default Menu;