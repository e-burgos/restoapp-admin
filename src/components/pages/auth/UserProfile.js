import React, {useContext, useState} from 'react';
import 'firebase/storage';
import { useFirebaseApp } from 'reactfire';
import useAuth from '../../../hooks/useAuth';
import useShop from '../../../hooks/useShop';
import AuthContext from '../../../context/auth/authContext';
import ShopContext from '../../../context/shops/shopContext';
import Sidebar from '../../ui/sidebar/Sidebar';
import Header from '../../ui/header/Header';
import UpdateUserForm from './UpdateUserForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import NewShopForm from '../../shops/NewShopForm';
import UpdateShopForm from '../../shops/UpdateShopForm';
import restoBg from '../../../assets/img/restaurant-bg.jpeg'
import avatar from '../../../assets/img/avatar.png'
import shopAvatar from '../../../assets/img/shop.png'

const UserProfile = () => {

    // Hooks
    const firebase = useFirebaseApp();

    // Verified if exist a user login
    const user = useAuth();

    // Verified if exist a current shop
    const currentShop = useShop();

    // Get states and function from shopContext
    const shopContext = useContext(ShopContext);
    const { addShop, updateShop, clearShopMessage, successShopMsg, errorShopMsg } = shopContext;

    // Get states and function from authContext
    const authContext = useContext(AuthContext);
    const { authMsg, errorMsg, updateUser, updatePasswordUser, logoutUser, emailVerification, clearMessage } = authContext;

    // Forms states
    const [updateForm, setUpdateForm] = useState(false);
    const [passwordForm, setPasswordForm] = useState(false);
    const [shopForm, setShopForm] = useState(false);
    const [shopUpdateForm, setShopUpdateForm] = useState(false);

    const showUpdateForm = () => {
        if(updateForm){
            setUpdateForm(false);
        } else {
            setUpdateForm(true);
        };
    };

    const showUpdatePasswordForm = () => {
        if(passwordForm){
            setPasswordForm(false);
        } else {
            setPasswordForm(true);
        };
    };

    const showNewShopForm = () => {
        if(shopForm){
            setShopForm(false);
        } else {
            setShopForm(true);
        };
    };

    const showUpdateShopForm = () => {
        if(shopUpdateForm){
            setShopUpdateForm(false);
        } else {
            setShopUpdateForm(true);
        };
    };

    return ( 
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <Header/>  
                <main className="h-full pb-16 overflow-y-auto"> 
                    <section className="w-full">
                        <img 
                            alt="cover-profile" 
                            src={restoBg}
                            className="w-full"    
                        />
                    </section>
                    <section className="flex flex-col items-center justify-center mx-10 -mt-44">    
                        <div className="relative flex flex-col bg-white shadow-xl rounded-lg w-full lg:w-10/12 border">
                            <div className="flex justify-center">                                 
                                <img
                                    alt="avatar"
                                    src={ user.photoURL === null ? avatar : user.photoURL}
                                    className="shadow-xl rounded-full h-32 w-32 align-middle -mt-14"
                                />
                                {currentShop.uid !== null ?
                                    <img
                                        alt="shop"
                                        src={ currentShop.logoURL === null ? shopAvatar : currentShop.logoURL}
                                        className="shadow-xl rounded-full h-32 w-32 align-middle -mt-14"
                                    />
                                : null}
                            </div>
                            <div className="text-center mt-8 mb-8">
                                {currentShop.uid !== null ?
                                <> 
                                    <h3 className="text-4xl font-semibold text-center uppercase">{currentShop.shopName}</h3>
                                    <p className="text-xl font-semibold leading-normal uppercase mb-1">
                                        {user.displayName !== null ? ` de ${user.displayName}` : null}
                                    </p>
                                    <div className="flex flex-row justify-center items-center mb-4">
                                        {currentShop.facebook !== "" ?
                                        <div className="mr-2 mx-1">
											<a href={currentShop.facebook} target="_blank" rel="noreferrer" title="Facebook">
                                                <div className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">  
                                                    <i className="fab fa-facebook mt-3 text-purple-600"></i>
                                                </div>
											</a>
										</div>
                                        : null}
                                        {currentShop.twitter !== "" ?
                                        <div className="mr-2 mx-1">
											<a href={currentShop.facebook} target="_blank" rel="noreferrer" title="Facebook">
                                                <div className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">  
                                                    <i className="fab fa-twitter mt-3 text-purple-600"></i>
                                                </div>											
                                            </a>
										</div>
                                        : null}
                                        {currentShop.instagram !== "" ?
                                        <div className="mr-2 mx-1">
											<a href={currentShop.facebook} target="_blank" rel="noreferrer" title="Facebook">
                                                <div className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">  
                                                    <i className="fab fa-instagram mt-3 text-purple-600"></i>
                                                </div>
                                            </a>
										</div>
                                        : null}
                                        {currentShop.whatsapp !== "" ?
                                        <div className="mr-2 mx-1">
											<a href={`https://wa.me/${currentShop.whatsapp}`} target="_blank" rel="noreferrer" title="Facebook">
                                                <div className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">  
                                                    <i className="fab fa-whatsapp mt-3 text-purple-600"></i>
                                                </div>
                                            </a>
										</div>
                                        : null}
                                    </div>

                                    <div className="flex lg:flex-row flex-col justify-center mb-2">
                                        <div className="text-sm leading-normal text-purple-500 font-bold uppercase mx-2">
                                            <i className="lnr lnr-envelope inline-block align-middle text-lg"></i>
                                            <span className="inline-block align-middle ml-1">{user.email}</span>
                                        </div>
                                        <div className="text-sm leading-normal text-purple-500 font-bold uppercase mx-2">
                                            <i className="lnr lnr-store inline-block align-middle text-lg"></i>
                                            <span className="inline-block align-middle ml-1">{currentShop.email}</span>
                                        </div>
                                        <div className="text-sm leading-normal text-purple-500 font-bold uppercase mx-2">
                                            <i className="lnr lnr-phone inline-block align-middle text-lg"></i>
                                            <span className="inline-block align-middle ml-1">{currentShop.phone}</span>
                                        </div>
                                    </div>	

                                    
                                        <div className="flex flex-col justify-center my-6 w-full p-6 border-r-4 text-sm text-black bg-gray-100 border-purple-400 outline-none shadow-outline-purple shadow-outline-gray">
                                            <span className="mb-2 text-xl uppercase">Acerca de tu negocio</span>
                                            <span className=" text-gray-600">{currentShop.description}</span>
                                        </div>
                                    	
                                </>
                                :
                                <> 
                                    <h3 className="text-3xl font-semibold leading-normal uppercase mb-1">
                                        {user.displayName === null ? "Agrega tu nombre" : user.displayName}
                                    </h3>
                                    <div className="text-sm leading-normal mb-3 text-purple-500 font-bold uppercase">
                                        <i className="lnr lnr-envelope inline-block align-middle text-lg"></i>
                                        <span className="inline-block align-middle ml-1">{user.email !== null ? user.email : "Agrega tu email"}</span>
                                    </div>
                                </>    
                                }

                                {user.emailVerified ? 
                                    <span className="px-4 py-1 text-sm text-white bg-green-600 border border-transparent rounded-xl"
                                        >
                                        <i className="lnr lnr-smile icon-bold text-white"></i>
                                        <span className=" ml-1">Email Verificado</span>
                                    </span>
                                :
                                    <button
                                        onClick={() => emailVerification()} 
                                        className=" px-3 py-1 text-sm text-white bg-red-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
                                        >
                                        <i className="lnr lnr-sad inline-block align-middle text-m text-white"></i>
                                        <span className="inline-block align-middle ml-1">Por favor, verifica tu email para comprobar que eres humano</span>
                                    </button>
                                }
                                
                                {errorMsg !== "" ? (
                                    <div className="block w-full mt-6 -mb-6 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                                        <p>{errorMsg}</p>
                                    </div>
                                ) : null}

                                {authMsg !== "" ? (
                                    <div className="block w-full mt-6 -mb-6 p-2 border-r-4 text-sm text-center text-white bg-green-400 border-green-600 outline-none shadow-outline-purple shadow-outline-gray">
                                        <p>{authMsg}</p>
                                    </div>
                                ) : null} 

                                {errorShopMsg !== "" ? (
                                    <div className="block w-full mt-6 -mb-6 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                                        <p>{errorShopMsg}</p>
                                    </div>
                                ) : null}

                                {successShopMsg !== "" ? (
                                    <div className="block w-full mt-6 -mb-6 p-2 border-r-4 text-sm text-center text-white bg-green-400 border-green-600 outline-none shadow-outline-purple shadow-outline-gray">
                                        <p>{successShopMsg}</p>
                                    </div>
                                ) : null} 
                                  
                            </div>

                            <div className="flex flex-row justify-center mb-8">
                                <button
                                    onClick={showUpdateForm} 
                                    className="px-4 py-2 mt-2 ml-2 text-sm text-left font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                >
                                    <i className="lnr lnr-pencil inline-block align-middle icon-bold text-white"></i>
                                    <span className="align-middle ml-2 text-sm hidden md:inline-block lg:inline-block xl:inline-block uppercase">PERFIL</span>
                                </button>

                                <button
                                    onClick={showUpdatePasswordForm} 
                                    className=" px-4 py-2 mt-2 ml-2 text-sm text-left font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                >
                                    <i className="lnr lnr-lock inline-block align-middle icon-bold text-white"></i>
                                    <span className=" align-middle ml-2 text-sm hidden md:inline-block lg:inline-block xl:inline-block uppercase">SEGURIDAD</span>
                                </button>

                                {currentShop.id === null ?
                                    <button
                                        onClick={showNewShopForm} 
                                        className=" px-4 py-2 mt-2 ml-2 text-sm text-left font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple"
                                    >
                                        <i className="lnr lnr-store inline-block align-middle icon-bold text-white"></i>
                                        <span className=" align-middle ml-2 text-sm hidden md:inline-block lg:inline-block xl:inline-block uppercase">
                                            Crear Negocio
                                        </span>
                                    </button>
                                :
                                    <button
                                        onClick={() => showUpdateShopForm()}
                                        className=" px-4 py-2 mt-2 ml-2 text-sm text-left font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    >
                                        <i className="lnr lnr-store inline-block align-middle icon-bold text-white"></i>
                                        <span className=" align-middle ml-2 text-sm hidden md:inline-block lg:inline-block xl:inline-block uppercase">
                                            Editar Negocio
                                        </span>
                                    </button>
                                }
                            </div>
                            
                            {updateForm ?
                                <div className=" py-10 px-4 border-t text-center">
                                    <UpdateUserForm 
                                        showUpdateForm={showUpdateForm}
                                        firebase={firebase}
                                        userToUpdate={user}
                                        updateUser={updateUser}
                                        clearMessage={clearMessage}
                                    />
                                </div>
                            : null}

                            {passwordForm ?
                                <div className=" py-10 px-4 border-t text-center">
                                    <UpdatePasswordForm 
                                        showUpdatePasswordForm={showUpdatePasswordForm}
                                        updatePasswordUser={updatePasswordUser}
                                        clearMessage={clearMessage}
                                        logoutUser={logoutUser}
                                    />
                                </div>
                            : null}

                            {shopForm ?
                                <div className=" py-10 px-4 border-t text-center">
                                    <NewShopForm 
                                        showNewShopForm={showNewShopForm}
                                        firebase={firebase}
                                        addShop={addShop}
                                        clearShopMessage={clearShopMessage}
                                        currentShop={currentShop}
                                    />
                                </div>
                            : null}

                            {shopUpdateForm ?
                                <div className=" py-10 px-4 border-t text-center">
                                    <UpdateShopForm 
                                        showUpdateShopForm={showUpdateShopForm}
                                        firebase={firebase}
                                        updateShop={updateShop}
                                        clearShopMessage={clearShopMessage}
                                        currentShop={currentShop}
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