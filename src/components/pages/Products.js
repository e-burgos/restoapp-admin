import React, {useState, useContext} from 'react';
import 'firebase/storage';
import { useFirebaseApp } from 'reactfire';
import ProductContext from '../../context/products/productContext';
import Sidebar from '../ui/sidebar/Sidebar';
import Header from '../ui/header/Header';
import useAuth from '../../hooks/useAuth';
import useCategories from '../../hooks/useCategories';
import ProductRecord from '../products/ProductRecord';
import FooterTable from '../products/FooterTable';
import NewProductForm from '../products/NewProductForm';
import UpdateProductForm from '../products/UpdateProductForm';
import DestroyProductForm from '../products/DestroyProductForm';
import ProductSearcher from '../products/ProductSearcher';
import useProducts from '../../hooks/useProducts';

const Products = () => {
    
    // Verified if exist a user login
    useAuth();

    // Hooks
    const firebase = useFirebaseApp();
    const categories = useCategories();
    const products = useProducts();

    // Get states and function from productContext
    const productContext = useContext(ProductContext);
    const { successMsg, errorMsg, getProducts, filterProducts } = productContext;

    const [newform, setNewform] = useState(false);
    const [updateform, setUpdateform] = useState(false);
    const [destroyform, setDestroyform] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState({});
    const [productToDestroy, setProductToDestroy] = useState({});
     
    // Show/Hide new product form
    const showNewForm = () => {
        if(newform){
            setNewform(false);
            setUpdateform(false);
            setDestroyform(false);
        } else {
            setNewform(true);
            setUpdateform(false);
            setDestroyform(false);
        }
    } 

    // Show/Hide update product form
    const showUpdateForm = (product) => {
        if(updateform){
            setUpdateform(false);
            setUpdateform(false);
            setDestroyform(false);
        } else {
            setUpdateform(true);
            setNewform(false);
            setDestroyform(false);
        }
        setProductToUpdate(product);
    } 

    // Show/Hide destroy product form
    const showDestroyForm = (product) => {
        if(destroyform){
            setDestroyform(false);
            setUpdateform(false);
            setNewform(false);
        } else {
            setDestroyform(true);
            setUpdateform(false);
            setNewform(false);
        }
        setProductToDestroy(product);
    } 

    return ( 
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <Header/>  
                <main className="h-full pb-16 overflow-y-auto"> 
                    <div className="container px-6 mx-auto grid">
                        <div className="flex flex-col items-start my-8">
                            <h1 className="text-3xl font-bold uppercase text-gray-700 dark:text-gray-200">Productos</h1>  
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <ProductSearcher
                                filterProducts={filterProducts}
                                getProducts={getProducts}
                            />
                            <button 
                                className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                onClick={() => showNewForm()}
                            >
                                <svg className="h-5 w-5 mr-1 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Agregar Producto</span>
                            </button>
                        </div>

                        {newform ? 
                            <NewProductForm 
                                showNewForm={showNewForm}
                                firebase={firebase}
                                categories={categories}
                            />
                        : null}

                        {updateform ? 
                            <UpdateProductForm 
                                showUpdateForm={showUpdateForm}
                                firebase={firebase}
                                productToUpdate={productToUpdate}
                                categories={categories}
                            />
                        : null}

                        {destroyform ? 
                            <DestroyProductForm 
                                showDestroyForm={showDestroyForm}
                                productToDestroy={productToDestroy}
                            />
                        : null}  

                        {errorMsg !== "" ? (
                            <div className="block w-full mt-4 mb-4 p-2 border-r-4 text-sm text-center text-white bg-red-500 border-red-600 outline-none shadow-outline-purple shadow-outline-gray">
                                <p>{errorMsg}</p>
                            </div>
                        ) : null}

                        {successMsg !== "" ? (
                            <div className="block w-full mt-4 mb-4 p-2 border-r-4 text-sm text-center text-white bg-green-400 border-green-600 outline-none shadow-outline-purple shadow-outline-gray">
                                <p>{successMsg}</p>
                            </div>
                        ) : null}
                        
                        <div className="w-full overflow-hidden rounded-lg shadow-xs">
                            <div className="w-full overflow-x-auto border-gray-300 border-solid border rounded-lg">
                                <table className="w-full whitespace-no-wrap">
                                    <thead>
                                        <tr
                                        className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                                        >
                                        <th className=""></th>
                                        <th className="px-4 py-3">Producto</th>
                                        <th className="px-4 py-3">Precio</th>
                                        <th className="px-4 py-3">Estado</th>
                                        <th className="px-4 py-3">Categoría</th>
                                        <th className="px-4 py-3">Descripción</th>
                                        <th className="px-4 py-3">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                        {products.sort().map( product => (
                                            <ProductRecord
                                                key={product.id}
                                                product={product}
                                                showUpdateForm={showUpdateForm}
                                                showDestroyForm={showDestroyForm}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                                <FooterTable
                                    products={products}
                                />
                            </div>
                        </div>
                    </div>   
                </main> 
            </div>
        </div>
     );
}
 
export default Products;