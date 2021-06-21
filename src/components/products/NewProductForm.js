import React, {useState, useContext} from 'react';
import ProductContext from '../../context/products/productContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUploader from 'react-firebase-file-uploader';

const NewProductFom = ({showNewForm, firebase, categories}) => {

    // Get states and function from productContext
    const productContext = useContext(ProductContext);
    const { addProduct, clearMessage } = productContext;

    // Uploader states
    const [upload, setUpload] = useState(false);
    const [progress, setProgress] = useState(0);
    const [urlimage, setUrlimage] = useState('');

    const formik = useFormik({
        initialValues: {
            productName: '',
            price: '',
            stock: '',
            category: '',
            status: '',
            image: '',
            description: '',
        },
        validationSchema: Yup.object({
            productName: Yup.string()
                    .min(3, 'El nombre debe tener al menos 3 caracteres')
                    .required('El nombre es obligatorio'),
            price: Yup.number()
                    .min(1, 'El precio debe tener al meno un numero')
                    .required('El precio es obligatorio'), 
            stock: Yup.number()
                    .min(1, 'El stock debe tener al meno un numero')
                    .required('El stock es obligatorio'),           
            category: Yup.string()
                    .required('La categoría es obligatoria'),
            status: Yup.string()
                    .required('El estado es obligatorio'),
            description: Yup.string()
                    .min(10, 'La descripción debe ser más larga')
                    .required('La descripción es obligatoria')
        }),
        onSubmit: data => {
            data.image = urlimage;
            data.uid = localStorage.getItem('userId');
            let categorySelected = data.category.split('/');
            data.category = categorySelected[0];
            data.categoryId = categorySelected[1];
            data.shopId = localStorage.getItem('shopId');
            addProduct(data);
            showNewForm();
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
    const handleUploadSuccess = async (productName) => {
        setProgress(100);
        setUpload(false);

        // Get urlImage
        const url = await firebase.storage().ref('products').child(productName).getDownloadURL();
        setUrlimage(url)
        console.log(url)
    }
    const handleProgress = progress => {
        setProgress(progress);
        console.log(progress)
    }

    return ( 
        <div className="px-6 py-8 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <form
                onSubmit={formik.handleSubmit}
            >
                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Producto</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese el nombre de la categoría"
                        type="text"
                        id="productName"
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </label>
                {formik.touched.productName && formik.errors.productName ? (
                    <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.productName}</p>
                    </div>
                ) : null}

                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Precio</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese el precio del producto"
                        type="number"
                        id="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </label>
                {formik.touched.price && formik.errors.price ? (
                    <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.price}</p>
                    </div>
                ) : null}

                <label className="block text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Stock</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese el precio del producto"
                        type="number"
                        id="stock"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </label>
                {formik.touched.stock && formik.errors.stock ? (
                    <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.stock}</p>
                    </div>
                ) : null}

                <label className="block text-sm mt-3">
                    <span className="text-gray-700 dark:text-gray-400">Categoría</span>
                    <select
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        id="category"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Seleccione una opción</option>
                        {categories.map(category => (
                            <option key={category.id} value={`${category.categoryName}/${category.id}`}>{category.categoryName}</option>
                            
                        ))}
                    </select>
                </label>
                {formik.touched.category && formik.errors.category ? (
                    <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.category}</p>
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
                        <option value="">Seleccione una opción</option>
                        <option value="active">Activo</option>
                        <option value="bloked">Bloqueado</option>
                    </select>
                </label>
                {formik.touched.status && formik.errors.status ? (
                    <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.status}</p>
                    </div>
                ) : null}

                <label className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Imagen</span>
                    <FileUploader
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        accept="image/*"
                        id="image"
                        name="image"
                        randomizeFilename
                        storageRef={firebase.storage().ref('products')}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                    />
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
                        className="mr-2 block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple"
                        type="submit"
                    >Agregar</button>
                    <button
                        onClick={() => showNewForm()}
                        className="ml-2 block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-gray-700 transition-colors duration-150 bg-gray-300 border border-transparent rounded-lg active:bg-white hover:bg-gray-400 focus:outline-none focus:shadow-outline-purple"
                        type="submit"
                    >Cancelar</button>
                </div>
            </form>
        </div>
     );
}
 
export default NewProductFom;