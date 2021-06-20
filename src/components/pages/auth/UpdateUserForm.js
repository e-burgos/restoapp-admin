import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUploader from 'react-firebase-file-uploader';
import avatar from '../../../assets/img/avatar.png'

const UpdateUserForm = ({showUpdateForm, userToUpdate, firebase, updateUser, clearMessage}) => {

    // Uploader states
    const [upload, setUpload] = useState(false);
    const [progress, setProgress] = useState(0);
    const [urlimage, setUrlimage] = useState('');

    const displayName = userToUpdate.displayName !== null ? userToUpdate.displayName : "";

    const formik = useFormik({
        initialValues: {
            displayName: displayName,
            photoURL: "",
        },
        validationSchema: Yup.object({
            displayName: Yup.string()
                        .min(3, 'El nombre debe tener al menos 3 caracteres')
                        .required('El nombre es obligatorio'),
        }),
        onSubmit: data => {
            if(urlimage !== ''){
                data.photoURL = urlimage;
            } else {
                data.photoURL = userToUpdate.photoURL;
            }
            updateUser(data);
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
                        id="displayName"
                        value={formik.values.displayName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </label>
                {formik.touched.displayName && formik.errors.displayName ? (
                    <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.displayName}</p>
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
                            id="photoURL"
                            name="photoURL"
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