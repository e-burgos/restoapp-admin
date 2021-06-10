import React, {useContext} from 'react';
import Navigation from './Navigation';
import UiContext from '../../../context/ui/uiContext';

const MobileSidebar = () => {

    const uiContext = useContext(UiContext);
    const { sidebarMobile } = uiContext;

    return ( 
    <>      
        { sidebarMobile ?
            <>   
            <div className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"></div>
            <aside className="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden">
                <Navigation/>
            </aside>
            </>
        : null}
    </>
    );
}
 
export default MobileSidebar;