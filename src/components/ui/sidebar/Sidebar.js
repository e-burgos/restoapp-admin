import React from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';

const Sidebar = ({mobileMenu, setMobileMenu}) => {
    return ( 
        <>
            <DesktopSidebar
                setMobileMenu={setMobileMenu}
            />
            <MobileSidebar
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />
        </>
     );
}
 
export default Sidebar;