import React from 'react';
import useAuth from '../../hooks/useAuth';
import Sidebar from '../ui/sidebar/Sidebar';
import Header from '../ui/header/Header';
import CardLineChart from "../cards/CardLineChart";
import CardBarChart from "../cards/CardBarChart";
import CardPageVisits from "../cards/CardPageVisits";
import CardSocialTraffic from "../cards/CardSocialTraffic";
import CardSettings from "../cards/CardSettings";
import CardProfile from "../cards/CardProfile";
import HeaderStats from '../ui/header/HeaderStats';

const Home = () => {

    // Verified if exist a user login
    useAuth();

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <Header/>  
                <main className="h-full pb-16 overflow-y-auto"> 
                    <div className="relative bg-blue-100">
                        <HeaderStats/>
                        
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