import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {

    // Extraer valores del context de auth
    const authContext = useContext(AuthContext);
    const { auth, loading, getUser } = authContext;

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, [])

    return ( 
        <Route { ...props } render={ props => !auth && !loading ? (
            <Navigate to="/" />
        ) : (
            <Component {...props} />
        ) } />
     );
}
 
export default PrivateRoute;