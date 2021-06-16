import React, {useContext, useState} from 'react';
import 'firebase/storage';
import { useFirebaseApp } from 'reactfire';
import useAuth from '../../../hooks/useAuth';
import AuthContext from '../../../context/auth/authContext';
import Sidebar from '../../ui/sidebar/Sidebar';
import Header from '../../ui/header/Header';
import UpdateUserForm from './UpdateUserForm';
import restoBg from '../../../assets/img/restaurant-bg.jpeg'
import avatar from '../../../assets/img/avatar.png'

const UserProfile = () => {

    // Verified if exist a user login
    useAuth();

    // Hooks
    const firebase = useFirebaseApp();

    // Get states and function from authContext
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    const [updateForm, setUpdateForm] = useState(false);

    const showUpdateForm = () => {
        if(updateForm){
            setUpdateForm(false);
        } else {
            setUpdateForm(true);
        };
    };

    return ( 
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <Header/>  
                <main className="h-full pb-16 overflow-y-auto"> 
                    <section className="h-full">
                        <div className="w-full ">
                            <img 
                                alt="cover-profile" 
                                src={restoBg}
                                className="w-full"    
                            />
                        </div>
                    </section>
                    <section className="flex flex-col items-center justify-center mx-10 -mt-96">    
                        <div className="relative flex flex-col bg-white shadow-xl rounded-lg w-full lg:w-10/12 border">
                            <div className="absolute">
                                <button
                                    onClick={showUpdateForm} 
                                    className=" px-4 py-2 mt-2 ml-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                >
                                    <i className="lnr lnr-pencil inline-block align-middle text-m text-white"></i>
                                    <span className=" align-middle ml-1 text-sm hidden md:inline-block lg:inline-block xl:inline-block">EDITAR</span>
                                </button>
                            </div>
                            <div className="flex justify-center">                                 
                                <img
                                    alt="..."
                                    src={avatar}
                                    className="shadow-xl rounded-full h-32 w-32 align-middle -mt-14"
                                />
                            </div>
                            <div className="text-center mt-8 mb-12">
                                <h3 className="text-3xl font-semibold leading-normal uppercase mb-1">
                                    {user.name !== null ? user.name : "Agrega tu nombre"}
                                </h3>
                                <div className="text-sm leading-normal mb-3 text-purple-500 font-bold uppercase">
                                    <i className="lnr lnr-envelope inline-block align-middle text-lg"></i>
                                    <span className="inline-block align-middle ml-1">{user.email !== null ? user.email : "Agrega tu email"}</span>
                                </div>
                                {user.emailVerified ? 
                                    <span className=" px-4 py-1 text-sm text-white bg-green-600 border border-transparent rounded-xl"
                                        >
                                        <i className="lnr lnr-smile text-m text-white"></i>
                                        <span className=" ml-1">Email Verificado</span>
                                    </span>
                                :
                                    <button 
                                        className=" px-3 py-1 text-sm text-white bg-red-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                                        >
                                        <i className="lnr lnr-sad inline-block align-middle text-m text-white"></i>
                                        <span className="inline-block align-middle ml-1">Por favor, verifica tu email para comprobar que eres humano</span>
                                    </button>
                                }
                               
                            </div>
                            {updateForm ?
                                <div className=" py-10 px-4 border-t text-center">
                                    <UpdateUserForm 
                                        showUpdateForm={showUpdateForm}
                                        firebase={firebase}
                                        userToUpdate={user}
                                    />
                                </div>
                            : null}
                        </div>
                    </section>
                </main> 
            </div>
        </div>
     );
}
 
export default UserProfile;