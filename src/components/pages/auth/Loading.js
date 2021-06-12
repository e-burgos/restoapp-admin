import React from 'react';


const Loading = () => {

    return ( 
        <div className="flex items-center h-full min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto">
                    <h1 className="mt-4 text-3xl text-center font-semibold text-gray-800 dark:text-gray-200">RESTOAPP</h1>
                    <h2 className="mb-4 font-semibold text-center text-gray-600 dark:text-gray-200">Cargando...</h2>
                </div>
            </div>
        </div>
     );
}
 
export default Loading;