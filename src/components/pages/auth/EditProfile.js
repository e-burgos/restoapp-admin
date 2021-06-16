import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Sidebar from '../../ui/sidebar/Sidebar';
import Header from '../../ui/header/Header';
import restoBg from '../../../assets/img/restaurant-bg.jpeg'
import avatar from '../../../assets/img/avatar.png'

const EditProfile = () => {

    // Verified if exist a user login
    useAuth();

    return ( 
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <Header/>  
                <main className="h-full pb-16 overflow-y-auto"> 
                    <section className="absolute block">
                        <div className=" w-full h-full bg-center bg-cover opacity-70">
                            <img alt="cover-profile" src={restoBg}/>
                        </div>
                    </section>
                    <section className="flex flex-col items-center justify-center mx-10 mt-32">    
                        <div className="relative flex flex-col bg-white shadow-xl rounded-lg">
                            <div className="flex justify-center">                                 
                                <img
                                    alt="..."
                                    src={avatar}
                                    className="shadow-xl rounded-full h-32 w-32 align-middle -mt-14"
                                />
                            </div>
                            <div className="text-center mt-8">
                            <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                                Jenna Stones
                            </h3>
                            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                Los Angeles, California
                            </div>
                            <div className="mb-2 text-blueGray-600 mt-10">
                                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                Solution Manager - Creative Tim Officer
                            </div>
                            <div className="mb-2 text-blueGray-600">
                                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                University of Computer Science
                            </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-9/12 px-4">
                                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                    An artist of considerable range, Jenna the name taken by
                                    Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                    performs and records all of his own music, giving it a
                                    warm, intimate feel with a solid groove structure. An
                                    artist of considerable range.
                                </p>
                                <button 
                                    className=" px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                >
                                    <span>Modificar Datos</span>
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    
                    
                    </section>
                </main>
                 
            </div>
        </div>
     );
}
 
export default EditProfile;