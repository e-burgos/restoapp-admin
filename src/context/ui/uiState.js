import React, {useState} from 'react';
import uiContext from './uiContext';

const UiState = (props) => {

    // define states
    const [sidebarMobile, setSidebarMobile] = useState(false);
    const [menuProfile, setMenuProfile] = useState(false);
    const [menuNotifications, setMenuNotifications] = useState(false);

    return ( 
        <uiContext.Provider
            value={{
                sidebarMobile: sidebarMobile,
                menuProfile: menuProfile,
                menuNotifications: menuNotifications,
                setSidebarMobile,
                setMenuProfile,
                setMenuNotifications
            }}
        >
            {props.children}
        </uiContext.Provider>
     );
}
 
export default UiState;