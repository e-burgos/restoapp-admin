import React, {useState, useContext} from 'react';
import AuthContext from '../../../context/auth/authContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUploader from 'react-firebase-file-uploader';
import avatar from '../../../assets/img/avatar.png'

const UpdateUserForm = ({showUpdateForm, userToUpdate, firebase}) => {

    // Get states and function from authContext
    const authContext = useContext(AuthContext);
    const { authMsg, errorMsg, clearMessage } = authContext;

    // Uploader states
    const [upload, setUpload] = useState(false);
    const [progress, setProgress] = useState(0);
    const [urlimage, setUrlimage] = useState('');

    const userName = userToUpdate.name !== null ? userToUpdate : "";

    console.log(userToUpdate)

    const formik = useFormik({
        initialValues: {
            userName: userName,
            email: userToUpdate.email,
            image: "",
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                        .min(3, 'El nombre debe tener al menos 3 caracteres')
                        .required('El nombre es obligatorio'),
            email: Yup.string()
                        .email('Debe ingresar un email válido')
                        .required('El email es obligatorio'),
        }),
        onSubmit: data => {
            if(urlimage !== ''){
                data.image = urlimage;
            } else {
                data.image = userToUpdate.image;
            }
            data.uid = localStorage.getItem('userId');
            data.id = userToUpdate.uid;
            
            console.log(data)

            //updateCategory(data);
            showUpdateForm();
            setTimeout(() => {
                clearMessage()
            }, 4000)
        }
    })

    // Define functions about image
    const handleUploadStart = () => {
        setProgress(0);
        setUpload(true);
    }
    const handleUploadError = error => {
        setUpload(false);
        console.log(error)
    }
    const handleUploadSuccess = async (userName) => {
        setProgress(100);
        setUpload(false);

        // Get urlImage
        const url = await firebase.storage().ref('users').child(userName).getDownloadURL();
        setUrlimage(url)
    }
    const handleProgress = progress => {
        setProgress(progress);
    }

    return ( 
        <div className="flex flex-col items-center">
            <form
                onSubmit={formik.handleSubmit}
            >
                <label className="block text-sm text-left">
                    <span className="text-gray-700  dark:text-gray-400">Nombre</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese el nombre de la categoría"
                        type="text"
                        id="userName"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </label>
                {formik.touched.userName && formik.errors.userName ? (
                    <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.userName}</p>
                    </div>
                ) : null}

                <label className="block text-sm text-left">
                    <span className="text-gray-700 dark:text-gray-400">Email</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese el nombre de la categoría"
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

                <label className="block mt-4 text-sm text-left">
                <span className="text-gray-700 dark:text-gray-400">Imagen Actual:</span>
                    <div className="flex mt-1 flex-row items-center">
                        <img
                            className="mr-2 object-cover w-10 h-10 "
                            src={userToUpdate.photoURL !== null ? userToUpdate.photoURL : avatar}
                            alt="avatar"
                            loading="lazy"
                        />
                        <FileUploader
                            className="block w-full  p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                            accept="image/*"
                            id="image"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref('users')}
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}
                        />
                    </div>
                    
                    
                </label>
                {upload ? (
                    <div className="mt-3 h-6 relative w-full border rounded-xl">
                        <div className="rounded-xl bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-6 flex items-center" style={{ width: `${progress}%` }}>
                            {progress} %
                        </div>
                    </div>
                ) : null}

                <div className="flex justify-items-center items-center">
                    <button
                        className="mr-2 block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                        type="submit"
                    >Actualizar</button>
                    <button
                        onClick={() => showUpdateForm()}
                        className="ml-2 block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-gray-700 transition-colors duration-150 bg-gray-300 border border-transparent rounded-lg active:bg-white hover:bg-gray-400 focus:outline-none focus:shadow-outline-purple"
                        type="submit"
                    >Cancelar</button>
                </div>
            </form>
        </div>
     );
}
 
export default UpdateUserForm;