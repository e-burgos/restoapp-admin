import React from 'react';
import ProductCategory from './ProductCategory';

const Category = ({category, activeProducts}) => {

  const filterProducts = activeProducts.filter(product => product.categoryId === category.id)

    return ( 
      <div className="flex items-center flex-col bg-white rounded-lg pb-2 shadow-xs dark:bg-gray-800">                          
        <h2 className="text-lg w-full text-center rounded-t-lg py-2 mb-2 font-semibold bg-purple-500 text-white dark:text-gray-200">{category.categoryName}</h2>
        {filterProducts.map(product => (
          <ProductCategory
            key={product.id}
            product={product}
          />
        ))}
    </div>
     );
}
 
export default Category;