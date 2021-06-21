import React from 'react';
import ProductCategory from './ProductCategory';
import categoryImage from '../../assets/img/category.png';
import useActiveProducts from '../../hooks/useActiveProducts';

const Category = ({category}) => {

  const activeProducts = useActiveProducts();
  const filterProducts = activeProducts.filter(product => product.categoryId === category.id)

    return ( 
      <div className="flex items-center flex-col bg-white rounded-lg pb-2 shadow-xs dark:bg-gray-800 mb-8 border">
        <img src={category.image !== "" ? category.image : categoryImage} alt="category" className="w-full max-h-20 object-cover opacity-30 object-center rounded-t-lg shadow-md"/>                          
        <div className=" relative px-2 -mt-16 mb-8">
          <h2 className="text-2xl w-full text-center rounded-t-lg py-2 mb-2 font-bold text-gray-4 dark:text-gray-200">{category.categoryName}</h2>
        </div>
        {filterProducts.length === 0 ?
          <h2 className="text-xl w-full text-center rounded-t-lg py-2 px-2 mb-2 font-bold text-gray-600 dark:text-gray-200">
            Aún no hay productos para esta categoría, desactivala o agrega uno.
          </h2>
        :
          <div className="grid gap-6 mb-4 md:grid-cols-2 xl:grid-cols-4">
            {filterProducts.map(product => (
            <ProductCategory
              key={product.id}
              product={product}
            />
          ))}
        </div> 
        }  
      </div>
     );
}
 
export default Category;