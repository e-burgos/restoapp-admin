import React, {useState, useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUploader from 'react-firebase-file-uploader';

const UpdateShopForm = ({showUpdateShopForm, firebase, updateShop, clearShopMessage, currentShop}) => {

    // Uploader states
    const [upload, setUpload] = useState(false);
    const [progress, setProgress] = useState(0);
    const [urlimage, setUrlimage] = useState('');
    const [formData, setFormData] = useState(false);

    useEffect(() => {
        if(formData){
            showUpdateShopForm()
            setFormData(false)
        };
    // eslint-disable-next-line
    }, [formData])

    const formik = useFormik({
        initialValues: {
            shopName: currentShop.shopName,
            address: currentShop.address,
            phone: currentShop.phone,
            email: currentShop.email,
            logoURL: '',
            status: currentShop.status,
            description: currentShop.description,
            whatsapp: currentShop.whatsapp,
            twitter: currentShop.twitter,
            instagram: currentShop.instagram,
            facebook: currentShop.facebook,
        },
        validationSchema: Yup.object({
            shopName: Yup.string()
                    .min(3, 'El nombre debe tener al menos 3 caracteres')
                    .required('El nombre es obligatorio'),
            address: Yup.string()
                    .min(3, 'La direccion debe tener al menos 3 caracteres')
                    .required('La dirección es obligatoria'),
            phone: Yup.number()
                    .min(8, 'El teléfono debe tener al menos 8 digitos')
                    .required('El teléfono es obligatorio'), 
            email: Yup.string()
                    .email('Debe ingresar un email válido')
                    .required('El email es obligatorio'),
            status: Yup.string()
                    .required('El estado es obligatorio'),
            description: Yup.string()
                    .min(15, 'La descripción debe ser más larga')
                    .required('La descripción es obligatoria'),
            whatsapp: Yup.number()
                    .min(8, 'El whatsapp debe tener al menos 8 digitos'),
            twitter: Yup.string()
                    .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        'Ingresa una url válida'),
            instagram: Yup.string()
                    .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        'Ingresa una url válida'),
            facebook: Yup.string()
                    .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        'Ingresa una url válida'),
        }),
        onSubmit: data => {
            if(urlimage !== ''){
                data.logoURL = urlimage;
            } else {
                data.logoURL = currentShop.logoURL;
            }
            data.id = currentShop.id;
            data.uid = localStorage.getItem('userId');
            updateShop(data);
            setFormData(true);
            setTimeout(() => {
                clearShopMessage()
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
    const handleUploadSuccess = async (shopName) => {
        setProgress(100);
        setUpload(false);

        // Get urlImage
        const url = await firebase.storage().ref('shops').child(shopName).getDownloadURL();
        setUrlimage(url)
        console.log(url)
    }
    const handleProgress = progress => {
        setProgress(progress);
        console.log(progress)
    }

    return ( 
        <div className="px-4 mb-6">
            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-row flex-wrap justify-center"
            >
                <label className="text-sm w-80 mx-2 mb-4 text-left">
                    <span className="text-gray-700 dark:text-gray-400">Nombre Comercial*</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese el nombre su negocio"
                        type="text"
                        id="shopName"
                        value={formik.values.shopName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.shopName && formik.errors.shopName ? (
                        <div className="w-80 mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                            <p>{formik.errors.shopName}</p>
                        </div>
                    ) : null}
                </label>
                

                <label className="text-sm w-80 mx-2 mb-4 text-left">
                    <span className="text-gray-700 dark:text-gray-400">Dirección Comercial*</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese la dirección de su negocio"
                        type="text"
                        id="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.address && formik.errors.address ? (
                    <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                        <p>{formik.errors.address}</p>
                    </div>
                ) : null}
                </label>
                
                <label className="text-sm w-80 mx-2 mb-4 text-left">
                    <span className="text-gray-700 dark:text-gray-400">Teléfono Comercial*</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese el teléfono de su negocio"
                        type="number"
                        id="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                            <p>{formik.errors.phone}</p>
                        </div>
                    ) : null}
                </label>
                
                <label className="text-sm w-80 mx-2 mb-4 text-left">
                    <span className="text-gray-700 dark:text-gray-400">Email Comercial*</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese el email de su negocio"
                        type="text"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                            <p>{formik.errors.email}</p>
                        </div>
                    ) : null}
                </label>
                
                <label className="text-sm w-80 mx-2 mb-4 text-left">
                    <span className="text-gray-700 dark:text-gray-400">Estado Inicial*</span>
                    <select
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        id="status"
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="active">Activo</option>
                        <option value="blocked">Bloqueado</option>
                    </select>
                    {formik.touched.status && formik.errors.status ? (
                        <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                            <p>{formik.errors.status}</p>
                        </div>
                    ) : null}
                </label>

                <label className="text-sm w-80 mx-2 mb-4 text-left">
                    <span className="text-gray-700 dark:text-gray-400">Facebook</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese la dirección web de su fanpage"
                        type="text"
                        id="facebook"
                        value={formik.values.facebook}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.facebook && formik.errors.facebook ? (
                        <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                            <p>{formik.errors.facebook}</p>
                        </div>
                    ) : null}
                </label>

                <label className="text-sm w-80 mx-2 mb-4 text-left">
                    <span className="text-gray-700 dark:text-gray-400">Instagram</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese la dirección web de su instagram"
                        type="text"
                        id="instagram"
                        value={formik.values.instagram}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.instagram && formik.errors.instagram ? (
                        <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                            <p>{formik.errors.instagram}</p>
                        </div>
                    ) : null}
                </label>

                <label className="text-sm w-80 mx-2 mb-4 text-left">
                    <span className="text-gray-700 dark:text-gray-400">Twitter</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese la dirección web de su twitter"
                        type="text"
                        id="twitter"
                        value={formik.values.twitter}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.twitter && formik.errors.twitter ? (
                        <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                            <p>{formik.errors.twitter}</p>
                        </div>
                    ) : null}
                </label>
                
                <label className="text-sm w-80 mx-2 mb-4 text-left">
                    <span className="text-gray-700 dark:text-gray-400">Whatsapp Comercial</span>
                    <input
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        placeholder="Ingrese el whatsapp de su negocio"
                        type="number"
                        id="whatsapp"
                        value={formik.values.whatsapp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.whatsapp && formik.errors.whatsapp ? (
                        <div className="block w-full mt-1 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                            <p>{formik.errors.whatsapp}</p>
                        </div>
                    ) : null}
                </label>
        
                <label className="text-sm w-80 mx-2 mb-4 text-left">
                    <span className="text-gray-700 dark:text-gray-400">Logotipo Comercial</span>
                    <FileUploader
                        className="block w-full mt-1 p-2 border-r-4 text-sm text-black border-gray-300 bg-gray-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple focus:shadow-outline-gray form-input"
                        accept="image/*"
                        id="logoURL"
                        name="logoURL"
                        randomizeFilename
                        storageRef={firebase.storage().ref('shops')}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                    />
                    {upload ? (
                        <div className="mt-3 h-6 relative w-full border rounded-xl">
                            <div className="rounded-xl bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-6 flex items-center" style={{ width: `${progress}%` }}>
                                {progress} %
                            </div>
                        </div>
                    ) : null}
                </label>

                <label className="text-sm w-full text-left">
                    <span className="text-gray-700 dark:text-gray-400">Descripción*</span>
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
                
                <div className="flex justify-items-center items-center w-full">
                    <button
                        className="mr-2 block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple"
                        type="submit"
                    >Agregar</button>
                    <button
                        onClick={() => showUpdateShopForm()}
                        className="ml-2 block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-gray-700 transition-colors duration-150 bg-gray-300 border border-transparent rounded-lg active:bg-white hover:bg-gray-400 focus:outline-none focus:shadow-outline-purple"
                        type="submit"
                    >Cancelar</button>
                </div>
            </form>
        </div>
     );
}
 
export default UpdateShopForm;