import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UiContext from '../../../context/ui/uiContext';

const Notifications = () => {

    const uiContext = useContext(UiContext);
    const { menuNotifications, setMenuProfile, setMenuNotifications } = uiContext;

    const showMenu = () => {
        if(menuNotifications){
            setMenuNotifications(false);
            setMenuProfile(false);
        } else {
            setMenuNotifications(true);
            setMenuProfile(false);
        };
    };

    return ( 
        <>
            <li className="relative">
                <button
                    onClick={() => showMenu()}
                    className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                    aria-label="Notifications"
                    aria-haspopup="true"
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                        d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                        ></path>
                    </svg>
                    {/* <!-- Notification badge --> */}
                    <span
                        aria-hidden="true"
                        className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                    ></span>
                </button>

                {menuNotifications ?
                    <ul
                        className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700"
                        aria-label="submenu"
                    >
                        <li className="flex">
                            <Link
                                onClick={() => showMenu()}  
                                className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                to="/"
                            >
                                <span>Mensajes</span>
                                <span
                                    className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600"
                                >13</span>
                            </Link>
                        </li>
                        <li className="flex">
                            <Link
                                onClick={() => showMenu()} 
                                className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                to="/"
                            >
                                <span>Pedidos</span>
                                <span
                                    className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-600"
                                >4</span>
                            </Link>
                        </li>
                    </ul>
                : null}
            </li>
        </>
     );
}
 
export default Notifications;