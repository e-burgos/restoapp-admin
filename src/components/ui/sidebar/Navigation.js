import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import UiContext from '../../../context/ui/uiContext';

const Navigation = () => {

    const uiContext = useContext(UiContext);
    const { setSidebarMobile, setMenuProfile, setMenuNotifications } = uiContext;

    const hideMenu = () => {
        setSidebarMobile(false); 
        setMenuProfile(false); 
        setMenuNotifications(false);
    }

    return ( 
        <div className="py-4 text-gray-500 dark:text-gray-400">
            <span className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">RESTOAPP</span>
            <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"></span> 
            <ul className="mt-6">
                <li className="relative px-6 py-3">
                    <NavLink
                        onClick={() => hideMenu()}
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        activeClassName="text-purple-500"
                        to="/"
                    >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            ></path>
                        </svg>
                        <span className="ml-4">Pedidos</span>    
                    </NavLink>
                </li>
                <li className="relative px-6 py-3">
                    <NavLink
                        onClick={() => hideMenu()} 
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        activeClassName="text-purple-500"
                        to="/menu"
                    >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path 
                            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                            ></path>
                        </svg>
                        <span className="ml-4">Menu</span>    
                    </NavLink>
                </li>
                <li className="relative px-6 py-3">
                    <NavLink
                        onClick={() => hideMenu()}
                        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        activeClassName="text-purple-500"
                        to="/new-product"
                    >
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            ></path>
                        </svg>
                        <span className="ml-4">Productos</span>    
                    </NavLink>
                </li>
            </ul>

                
        </div>
     );
}
 
export default Navigation;
