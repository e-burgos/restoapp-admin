import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../../context/auth/authContext';

const ForgotPassword = () => {

    // Get states and function from authState
    const authContext = useContext(AuthContext);
    const { authMsg, errorMsg, forgotPassword, clearMessage } = authContext;

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('Debe ingresar un email válido')
                        .required('El email es obligatorio'),
        }),
        onSubmit: data => {
            console.log(data)
            forgotPassword(data.email);
            setTimeout(() => {
                
                    navigate('/login')
                
                    clearMessage();
                
            }, 3000)
        }
    })


    return ( 
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src="https://www.circuitogastronomico.com/wp-content/uploads/2018/06/DSC1521-HDR_Lucca.jpg"
                            alt="restobar"
                        />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Recuperar Contraseña
                            </h1>
                            <form
                                onSubmit={formik.handleSubmit}
                            >
                                <label className="block text-sm">
                                    <span className="text-gray-700 dark:text-gray-400">Email</span>
                                    <input
                                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                                        placeholder="ingrese su email"
                                        type="text"
                                        id="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </label>
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                                            <p>{formik.errors.email}</p>
                                        </div>
                                    ) : null}
                                <button
                                    type="submit"
                                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                >Enviar</button>
                            </form>

                            {authMsg !== "" ? (
                                <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-green-400 border-green-600 outline-none shadow-outline-purple shadow-outline-gray">
                                    <p>{authMsg}</p>
                                </div>
                            ) : null}
                            {errorMsg !== "" ? (
                                <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                                    <p>{errorMsg}</p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ForgotPassword;