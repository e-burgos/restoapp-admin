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
    UPDATE_USER,
    FORGOT_PASSWORD,
    AUTH_MSG,
} from '../../types';

const AuthState = props => {

    // Call Hooks
    const firebase = useFirebaseApp();
    const navigate = useNavigate();

    const inicialUser = {
        uid: null,
        displayName: null,
        email: null,
        photoURL: null,
        emailVerified: false,
        phoneNumber: null,
        disabled: null,
        admin: false
    };

    // Initial state
    const initialState = {
        auth: false,
        user: inicialUser,
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
        const currentUser = firebase.auth().currentUser;
        if(currentUser){
            const data = userData(currentUser, 'Se obtuvo un usuario correctamente');
            dispatch({
                type: GET_USER,
                payload: data
            })
        } else {
            dispatch({
                type: LOGIN_ERROR,
                payload: {
                    user: inicialUser,
                    msg: 'No es posible obtener datos del usuario'
                },
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
                payload: {
                    user: inicialUser,
                    msg: 'Los datos ingresados son incorrectos'
                },
            })
        }
    }

    // Regitration user
    const registerUser = async (email, password, displayName) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = firebase.auth().currentUser;
            await user.updateProfile({displayName: displayName});
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

    // Logout user
    const logoutUser = async () => {
        await firebase.auth().signOut()
        dispatch({
            type: LOGOUT,
            payload: inicialUser
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
                payload: {
                    user: inicialUser,
                    msg
                },
            })
        }
    }

    // Update user
    const updateUser = async (data) => {
        try {
            const user = firebase.auth().currentUser;
            await user.updateProfile({
                displayName: data.displayName,
                photoURL: data.photoURL
            });
            const updateUser = userData(user, 'El usuario se actualizo correctamente');
            dispatch({
                type: UPDATE_USER,
                payload: updateUser,
            })
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: LOGIN_ERROR,
                payload: {
                    user: inicialUser,
                    msg: 'Los datos ingresados son incorrectos'
                },
            })
        }
    }

    // Update password user
    const updatePasswordUser = async (password) => {
        try {
            const user = firebase.auth().currentUser;
            await user.updatePassword(password);
            dispatch({
                type: LOGOUT,
            })
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: LOGIN_ERROR,
                payload: {
                    user: inicialUser,
                    msg: 'Los datos ingresados son incorrectos'
                },
            })
        }
    }

    // User email verification
    const emailVerification = async () => {
        try {
            await firebase.auth().currentUser.sendEmailVerification();
            dispatch({
                type: AUTH_MSG,
                payload: 'Por favor revisa tu correo para verificar tu email',
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    // Get current user
    const userData = (user, msg) => {
        const data = {
            currentUser: {
                uid: user.uid,
                displayName: user.displayName ? user.displayName : null,
                email: user.email,
                photoURL: user.photoURL ? user.photoURL : null,
                emailVerified: user.emailVerified ? user.emailVerified : false,
                phoneNumber: user.phoneNumber ? user.phoneNumber : null,
                disabled: user.disabled === undefined ? false : true,
                admin: user.email === `${process.env.REACT_APP_ADMIN_EMAIL}` ? true : false,
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
                updateUser,
                loginUser,
                registerUser,
                logoutUser,
                forgotPassword,
                clearMessage,
                emailVerification,
                updatePasswordUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;