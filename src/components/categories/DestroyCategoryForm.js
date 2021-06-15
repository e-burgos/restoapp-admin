import React, {useContext} from 'react';
import CategoryContext from '../../context/categories/categoryContext';

const DestroyCategoryForm = ({showDestroyForm, categoryToDestroy}) => {

    // Get states and function from categoryContext
    const categoryContext = useContext(CategoryContext);
    const { destroyCategory, clearMessage } = categoryContext;

    const submit = () => {
        destroyCategory(categoryToDestroy);
        showDestroyForm();
        setTimeout(() => {
            clearMessage()
        }, 4000);
    };

    return ( 
        <div className="px-6 py-8 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h4 className="text-md mb-4 text-center font-semibold text-gray-600 dark:text-gray-300">¿Realmente deseas eliminar la categoría {categoryToDestroy.categoryName}?</h4>
            <div className="flex justify-items-center items-center">
                <button
                    onClick={() => submit()}
                    className="mx-4 block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple"
                    type="submit"
                >Eliminar</button>
                <button
                    onClick={() => showDestroyForm()}
                    className="mx-4 block w-full px-4 py-2 mt-8 text-sm font-medium leading-5 text-center text-gray-700 transition-colors duration-150 bg-gray-300 border border-transparent rounded-lg active:bg-white hover:bg-gray-400 focus:outline-none focus:shadow-outline-purple"
                    type="submit"
                >Cancelar</button>
            </div>   
        </div>
     );
}
 
export default DestroyCategoryForm;