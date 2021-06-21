import React, {useState, useContext} from 'react';
import CategoryContext from '../../context/categories/categoryContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUploader from 'react-firebase-file-uploader';
import categoryImage from '../../assets/img/category.png';

const UpdateCategoryFom = ({showUpdateForm, categoryToUpdate, firebase}) => {

    // Get states and function from categoryContext
    const categoryContext = useContext(CategoryContext);
    const { updateCategory, clearMessage } = categoryContext;

    // Uploader states
    const [upload, setUpload] = useState(false);
    const [progress, setProgress] = useState(0);
    const [urlimage, setUrlimage] = useState('');

    const formik = useFormik({
        initialValues: {
            categoryName: categoryToUpdate.categoryName,
            status: categoryToUpdate.status,
            image: "",
            description: categoryToUpdate.description,
        },
        validationSchema: Yup.object({
            categoryName: Yup.string()
                        .min(3, 'El nombre debe tener al menos 3 caracteres')
                        .required('El nombre es obligatorio'),
            status: Yup.string()
                        .required('El estado es obligatorio'),
            description: Yup.string()
                        .min(10, 'La descripción debe ser más larga')
                        .required('La descripción es obligatoria')
        }),
        onSubmit: data => {
            if(urlimage !== ''){
                data.image = urlimage;
            } else {
                data.image = categoryToUpdate.image;
            }
            data.uid = localStorage.getItem('userId');
            data.id = categoryToUpdate.id;
            data.shopId = localStorage.getItem('shopId');
            updateCategory(data);
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
    const handleUploadSuccess = async (categoryName) => {
        setProgress(100);
        setUpload(false);

        // Get urlImage
        const url = await firebase.storage().ref('categories').child(categoryName).getDownloadURL();
        setUrlimage(url)
    }
    const handleProgress = progress => {
        setProgress(progress);
    }

    return ( 
        <div className="px-6 py-8 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h4 className="text-md mb-4 text-center font-semibold text-gray-600 dark:text-gray-300">Categoría {categoryToUpdate.categoryName}</h4>
            <form
                onSubmit={formik.handleSubmit}
            >
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Categoría</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese el nombre de la categoría"
                        type="text"
                        id="categoryName"
                        value={formik.values.categoryName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </label>
                {formik.touched.categoryName && formik.errors.categoryName ? (
                    <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.categoryName}</p>
                    </div>
                ) : null}

                <label className="block text-sm mt-3">
                    <span className="text-gray-700 dark:text-gray-400">Estado Inicial</span>
                    <select
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        id="status"
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="active">Activa</option>
                        <option value="bloked">Bloqueada</option>
                    </select>
                </label>
                {formik.touched.status && formik.errors.status ? (
                    <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.status}</p>
                    </div>
                ) : null}

                <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">Imagen Actual:</span>
                    <div className="flex mt-1 flex-row items-center">
                        <img
                            className="mr-2 object-cover w-10 h-10 "
                            src={categoryToUpdate.image !== "" ? categoryToUpdate.image : categoryImage}
                            alt=""
                            loading="lazy"
                        />
                        <FileUploader
                            className="block w-full  p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                            accept="image/*"
                            id="image"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref('categories')}
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

                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Descripción</span>
                    <textarea
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese una descripción"
                        type="text"
                        id="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    ></textarea>
                </label>
                {formik.touched.description && formik.errors.description ? (
                    <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.description}</p>
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
 
export default UpdateCategoryFom;