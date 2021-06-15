import React, {useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { useNavigate } from 'react-router-dom';
import 'firebase/auth';
import { useFirebaseApp } from 'reactfire';
import { 
    LOGIN_ERROR, 
    LOGIN_SUCCESS,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR, 
    LOGOUT, 
    CLEAR_MESSAGE, 
    GET_USER,
    FORGOT_PASSWORD,
} from '../../types';

const AuthState = props => {

    // Call Hooks
    const firebase = useFirebaseApp();
    const navigate = useNavigate();

    // Initial state
    const initialState = {
        auth: false,
        user: null,
        authMsg: '',
        errorMsg: '',
        loading: true
    };

    // Define Reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    
    // Auth user
    const authUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                getUser();
                return user;
            } else {
                logoutUser();
                navigate('/login')
            };
        });
    };

    // Get current user
    const getUser = () => {
        const user = firebase.auth().currentUser;
        if(user){
            const data = userData(user, 'Se obtuvo un usuario correctamente');
            dispatch({
                type: GET_USER,
                payload: data
            })
        } else {
            dispatch({
                type: LOGIN_ERROR,
                payload: 'No es posible obtener datos del usuario',
            })
        }
    };

   
    // Login user
    const loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            const user = firebase.auth().currentUser;
            const data = userData(user, 'Inicio existoso, te redigiremos a tu perfil');
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data,
            })
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: LOGIN_ERROR,
                payload: 'Los datos ingresados son incorrectos',
            })
        }
    }

    // Regitration user
    const registerUser = async (email, password, name) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = firebase.auth().currentUser;
            await user.updateProfile({displayName: name});
            const data = userData(user, 'Registro existoso, te redigiremos a tu perfil');
            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            let msg = "";
            if(error.code === "auth/email-already-in-use"){
                msg = "Este email ya se encuenta utilizado";
            } else {
                msg = 'No es posible registrar el usuario, intenta nuevamente';
            }
            dispatch({
                type: REGISTRATION_ERROR,
                payload: msg,
            })
        }
    }

    // Login user
    const logoutUser = async () => {
        await firebase.auth().signOut()
        dispatch({
            type: LOGOUT
        })
    }

    // Forgot password
    const forgotPassword = async (email) => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            dispatch({
                type: FORGOT_PASSWORD,
                payload: "Enviamos un mensaje a tu casilla de correo para recuperar tu cuenta"
            })
        } catch (error) {
            console.log(error);
            let msg = "";
            if(error.code === "auth/user-not-found"){
                msg = "No encontramos un usuario registrado con este email";
            } else {
                msg = 'Los datos ingresados son incorrectos';
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: msg,
            })
        }
    }

    // Get current user
    const userData = (user, msg) => {
        const data = {
            currentUser: {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                admin: false
            },
            msg: msg,
        };
        return data;
    };

    // Clear all alerts
    const clearMessage = () => {
        dispatch({
            type: CLEAR_MESSAGE,
        })
    };

    return (
        <AuthContext.Provider
            value={{
                auth: state.auth,
                user: state.user,
                authMsg: state.authMsg,
                errorMsg: state.errorMsg,
                authUser,
                getUser,
                loginUser,
                registerUser,
                logoutUser,
                forgotPassword,
                clearMessage,
            }}
        >
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;