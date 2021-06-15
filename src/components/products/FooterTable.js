import React from 'react';

const FooterTable = ({products}) => {
    return ( 
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span className="flex items-center col-span-3">{products.length === 0 ? 'No hay productos' : `Mostrando ${products.length} resultado(s)`}</span>
            <span className="col-span-2"></span>
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                {/* TODO: Pagination */}
            </span>
        </div>
     );
}
 
export default FooterTable;