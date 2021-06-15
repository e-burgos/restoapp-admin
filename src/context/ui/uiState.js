import React, {useState} from 'react';
import uiContext from './uiContext';

const UiState = (props) => {

    // define states
    const [sidebarMobile, setSidebarMobile] = useState(false);
    const [menuProfile, setMenuProfile] = useState(false);
    const [menuNotifications, setMenuNotifications] = useState(false);
    const [submenu, setSubmenu] = useState(false);

    const showSubmenu = () => {
        if(submenu){
            setSubmenu(false);
        } else {
            setSubmenu(true)
        }
    };

    return ( 
        <uiContext.Provider
            value={{
                sidebarMobile: sidebarMobile,
                menuProfile: menuProfile,
                menuNotifications: menuNotifications,
                submenu: submenu,
                setSidebarMobile,
                setMenuProfile,
                setMenuNotifications,
                showSubmenu
            }}
        >
            {props.children}
        </uiContext.Provider>
     );
}
 
export default UiState;