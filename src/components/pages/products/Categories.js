import React, {useState, useEffect, useContext} from 'react';
import 'firebase/storage';
import { useFirebaseApp } from 'reactfire';
import Sidebar from '../../ui/sidebar/Sidebar';
import Header from '../../ui/header/Header';
import useAuth from '../../../hooks/useAuth';
import CategoryRecord from '../../categories/CategoryRecord';
import FooterTable from '../../categories/FooterTable';
import NewCategoryForm from '../../categories/NewCategoryForm';
import UpdateCategoryForm from '../../categories/UpdateCategoryForm';
import DestroyCategoryForm from '../../categories/DestroyCategoryForm';
import CategoryContext from '../../../context/categories/categoryContext';
import CategorySearcher from '../../categories/CategorySearcher';

const Categories = () => {
    
    // Verified if exist a user login
    useAuth();

    // Hooks
    const firebase = useFirebaseApp();

    // Get states and function from categoryContext
    const categoryContext = useContext(CategoryContext);
    const { successMsg, errorMsg, categories ,getCategories, filterCategories } = categoryContext;

    const [newform, setNewform] = useState(false);
    const [updateform, setUpdateform] = useState(false);
    const [destroyform, setDestroyform] = useState(false);
    const [categoryToUpdate, setCategoryToUpdate] = useState({});
    const [categoryToDestroy, setCategoryToDestroy] = useState({});

    useEffect(() => {
            getCategories(localStorage.getItem('userId'));
        // eslint-disable-next-line
    }, []); 
     
    // Show/Hide new category form
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

    // Show/Hide update category form
    const showUpdateForm = (category) => {
        if(updateform){
            setUpdateform(false);
            setUpdateform(false);
            setDestroyform(false);
        } else {
            setUpdateform(true);
            setNewform(false);
            setDestroyform(false);
        }
        setCategoryToUpdate(category);
    } 

    // Show/Hide destroy category form
    const showDestroyForm = (category) => {
        if(destroyform){
            setDestroyform(false);
            setUpdateform(false);
            setNewform(false);
        } else {
            setDestroyform(true);
            setUpdateform(false);
            setNewform(false);
        }
        setCategoryToDestroy(category);
    } 

    return ( 
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <Header/>  
                <main className="h-full pb-16 overflow-y-auto"> 
                    <div className="container px-6 mx-auto grid">
                        <h1 className="my-6 text-3xl font-semibold text-gray-700 dark:text-gray-200">Categorías</h1>
                        <div className="flex items-center justify-between mb-4">
                            <CategorySearcher
                                filterCategories={filterCategories}
                                getCategories={getCategories}
                            />
                            <button 
                                className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                onClick={() => showNewForm()}
                            >
                                <svg className="h-5 w-5 mr-1 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Agregar Categoría</span>
                            </button>
                        </div>

                        {newform ? 
                            <NewCategoryForm 
                                showNewForm={showNewForm}
                                firebase={firebase}
                            />
                        : null}

                        {updateform ? 
                            <UpdateCategoryForm 
                                showUpdateForm={showUpdateForm}
                                firebase={firebase}
                                categoryToUpdate={categoryToUpdate}
                            />
                        : null}

                        {destroyform ? 
                            <DestroyCategoryForm 
                                showDestroyForm={showDestroyForm}
                                categoryToDestroy={categoryToDestroy}
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
                                        <th className="px-4 py-3">Categoria</th>
                                        <th className="px-4 py-3">Descripción</th>
                                        <th className="px-4 py-3">Estado</th>
                                        <th className="px-4 py-3">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                        {categories.sort().map( category => (
                                            <CategoryRecord
                                                key={category.id}
                                                category={category}
                                                showUpdateForm={showUpdateForm}
                                                showDestroyForm={showDestroyForm}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                                <FooterTable
                                    categories={categories}
                                />
                            </div>
                        </div>
                    </div>   
                </main> 
            </div>
        </div>
     );
}
 
export default Categories;