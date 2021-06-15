import {useEffect, useContext} from 'react';
import AuthContext from '../context/auth/authContext';

const useAuth = () => {

    //Get state and function to verified if exist a user login
    const authContext = useContext(AuthContext);
    const { auth, authUser } = authContext;

    // Check status
    useEffect(() => {
        if(!auth){
            authUser();
        }
    }, [auth, authUser])
    
};

export default useAuth;