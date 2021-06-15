import React from 'react';
import useAuth from '../../hooks/useAuth';
import Sidebar from '../ui/sidebar/Sidebar';
import Header from '../ui/header/Header';

const Home = () => {

    // Verified if exist a user login
    useAuth();

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <Header/>  
                <main className="h-full pb-16 overflow-y-auto"> 
                    <div className="container px-6 mx-auto grid">
                        <h1 className="my-6 text-3xl font-semibold text-gray-700 dark:text-gray-200">Inicio</h1>  
                        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Pagina en construcción</h4>
                    </div>   
                </main>  
            </div>
        </div>
    );
}
 
export default Home;