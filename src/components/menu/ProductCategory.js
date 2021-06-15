import React from 'react';
import productImage from '../../assets/img/product.png';

const ProductCategory = ({product}) => {
    return ( 
        <div className="min-w-0 p-4 bg-white border m-2 rounded-lg shadow-xs dark:bg-gray-800">
          <img
            className="rounded-lg mb-3" 
            src={product.image !== "" ? product.image : productImage}
            alt="product"
          />
            <h4 className="mr-2 text-xl font-semibold text-center mb-3 text-gray-600 dark:text-gray-300">{product.productName}</h4>

          <p className="text-gray-600 text-sm text-center mb-3 dark:text-gray-400">{product.description}</p>
          <h2 className="text-lg w-full text-center rounded-md font-semibold bg-purple-500 text-white dark:text-gray-200">${product.price}</h2>
        </div>
     );
}
 
export default ProductCategory;