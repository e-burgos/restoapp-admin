import React from 'react';
import Navigation from './Navigation';

const DesktopSidebar = () => {
    return ( 
        <aside className="z-20 hidden w-64 overflow-y-auto shadow-md bg-white dark:bg-gray-800 md:block sm:hidden flex-shrink-0">
            <Navigation />
        </aside>
    );
}
 
export default DesktopSidebar;