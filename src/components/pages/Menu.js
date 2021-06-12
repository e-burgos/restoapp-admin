import React, {useEffect, useContext} from 'react';
import AuthContext from '../../context/auth/authContext';
import Sidebar from '../ui/sidebar/Sidebar';
import Header from '../ui/header/Header';

const Menu = () => {

    //Get state and function to verified if exist a user login
    const authContext = useContext(AuthContext);
    const { auth, authUser } = authContext;

    // Check status
    useEffect(() => {
        if(!auth){
            authUser();
        }
    }, [auth, authUser])

    return ( 
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <Header/>  
                <main className="h-full pb-16 overflow-y-auto">
                    <h1 className="text-3xl font-light mb-4">Menu</h1>
                </main>
            </div>
        </div>
     );
}
 
export default Menu;