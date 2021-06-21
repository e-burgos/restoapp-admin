import React from 'react';
import useAuth from '../../hooks/useAuth';
import Sidebar from '../ui/sidebar/Sidebar';
import Header from '../ui/header/Header';
import CardLineChart from "../../components/cards/CardLineChart";
import CardBarChart from "../../components/cards/CardBarChart";
import CardPageVisits from "../../components/cards/CardPageVisits";
import CardSocialTraffic from "../../components/cards/CardSocialTraffic";
import CardSettings from "../../components/cards/CardSettings";
import CardProfile from "../../components/cards/CardProfile";

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
                        
                        <div className="flex flex-wrap w-full">
                            <div className="w-full xl:w-3/5 px-4">
                                <CardLineChart />
                            </div>
                            <div className="w-full xl:w-2/5 px-4">
                                <CardBarChart />
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-4">
                            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                                <CardPageVisits />
                            </div>
                            <div className="w-full xl:w-4/12 px-4">
                                <CardSocialTraffic />
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-8/12 px-4">
                            <CardSettings />
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                            <CardProfile />
                            </div>
                        </div>   
                    </div>
                </main>  
            </div>
        </div>
    );
}
 
export default Home;