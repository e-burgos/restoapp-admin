import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UpdatePasswordForm = ({showUpdatePasswordForm, updatePasswordUser, clearMessage, logoutUser}) => {

    const formik = useFormik({
        initialValues: {
            password: '',
            repassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                        .min(6, 'La contraseña debe tener al menos 6 caracteres')
                        .required('La contraseña es obligatoria'),
            repassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'La confirmación debe ser igual a la contraseña')
                        .required('La confirmación es obligatoria'),
        }),
        onSubmit: data => {
            updatePasswordUser(data.password);
            showUpdatePasswordForm();
            logoutUser();
            setTimeout(() => {
                clearMessage()
            }, 4000)
        }
    })

    return ( 
        <div className="flex flex-col items-center">
            <form
                onSubmit={formik.handleSubmit}
            >
                <label className="block mt-4 text-sm text-left">
                    <span className="text-gray-700 dark:text-gray-400">Contraseña</span>
                    <input
                        className=" w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese su contraseña"
                        type="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </label>
                {formik.touched.password && formik.errors.password ? (
                    <div className="w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.password}</p>
                    </div>
                ) : null}

                <label className="block mt-4 text-sm text-left">
                    <span className="text-gray-700 dark:text-gray-400">Confirmar Contraseña</span>
                    <input
                        className="w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Confirme su contraseña"
                        type="password"
                        id="repassword"
                        value={formik.values.repassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </label>
                {formik.touched.password && formik.errors.password ? (
                    <div className="w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.repassword}</p>
                    </div>
                ) : null}

                <div className="flex justify-items-center items-center">
                    <button
                        className="mr-2 w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                        type="submit"
                    >Actualizar</button>
                    <button
                        onClick={() => showUpdatePasswordForm()}
                        className="ml-2 w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-gray-700 transition-colors duration-150 bg-gray-300 border border-transparent rounded-lg active:bg-white hover:bg-gray-400 focus:outline-none focus:shadow-outline-purple"
                        type="submit"
                    >Cancelar</button>
                </div>
            </form>
        </div>
     );
}
 
export default UpdatePasswordForm;