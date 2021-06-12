import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../../context/auth/authContext';

const NewAccount = () => {

    // Get states and function from authState
    const authContext = useContext(AuthContext);
    const { auth, authMsg, errorMsg, registerUser, clearMessage } = authContext;

    const navigate = useNavigate();

    useEffect(() => {
        if(auth){
            setTimeout(() => {
                navigate('/');
            }, 2000)
        }
    }, [auth, navigate])

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            repassword: '',
            check: false
        },
        validationSchema: Yup.object({
            name: Yup.string()
                        .required('Su nombre es obligatorio'),
            email: Yup.string()
                        .email('Debe ingresar un email válido')
                        .required('El email es obligatorio'),
            password: Yup.string()
                        .min(6, 'La contraseña debe tener al menos 6 caracteres')
                        .required('La contraseña es obligatoria'),
            repassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'La confirmación debe ser igual a la contraseña')
                        .required('La confirmación es obligatoria'),
            check: Yup.boolean()
                        .oneOf([true],'Debe aceptar los terminos y condiciones')
        }),
        onSubmit: data => {
            registerUser(data.email, data.password, data.name);
            setTimeout(() => {
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
                        <h1 className="mb-0  font-semibold text-center text-gray-600 dark:text-gray-200">Crear una cuenta en</h1>
                        <h1 className="mb-4 text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">RESTOAPP</h1>
                        <form
                            onSubmit={formik.handleSubmit}
                        >   
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Propietario</span>
                                <input
                                    className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                                    placeholder="ingrese su nombre completo"
                                    type="text"
                                    id="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </label>
                            {formik.touched.name && formik.errors.name ? (
                                <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null}

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
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Contraseña</span>
                                <input
                                    className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                                    placeholder="Ingrese su contraseña"
                                    type="password"
                                    id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </label>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}

                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Confirmar Contraseña</span>
                                <input
                                    className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                                    placeholder="Confirme su contraseña"
                                    type="password"
                                    id="repassword"
                                    value={formik.values.repassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </label>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                                    <p>{formik.errors.repassword}</p>
                                </div>
                            ) : null}

                            <div className="flex mt-6 text-sm">
                                <label className="flex items-center dark:text-gray-400">
                                    <input
                                        type="checkbox"
                                        className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                        id="check"
                                        value={formik.values.check}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <span className="ml-2">Estoy de acuerdo con las <span className="underline"> Politicas de privacidad</span>
                                    </span>
                                </label>
                            </div>
                            {formik.touched.check && formik.errors.check ? (
                                <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                                    <p>{formik.errors.check}</p>
                                </div>
                            ) : null}

                            <button
                                className="block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                type="submit"
                            >Crear Cuenta</button>
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

                        <hr className="my-8" />

                        <Link
                            to="/login"
                            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
                        >Ya tengo una cuenta</Link>

                        <p className="mt-4">
                            <a
                            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                            href="https://www.estebanburgos.com.ar/"
                            rel="noreferrer"
                            target="_blank"
                            >Contactar al desarrollador</a>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NewAccount;