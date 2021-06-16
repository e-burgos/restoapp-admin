import React from 'react';
import productImage from '../../assets/img/product.png';

const ProductCategory = ({product}) => {
    return ( 
      <div className=" grid  p-2 antialiased text-gray-900">
        <img src={product.image !== "" ? product.image : productImage} alt="product" className="w-full max-h-48  object-cover object-center rounded-lg shadow-md"/>    
        <div className=" relative px-2 -mt-32">
          <div className="bg-white pt-6 pb-6 pr-3 pl-3 rounded-lg shadow-lg opacity-90">
            <div className="flex justify-between items-center">
              <span className={`${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'} text-white text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide`}>
                {product.stock > 0 ? 'Disponible' : 'Agotado'}
              </span>
              <div className="ml-2 text-gray-800 uppercase text-xl font-semibold tracking-wider">
                ${product.price}
              </div>  
            </div>
            <h4 className="mt-1 text-xl font-semibold text-center leading-tight">{product.productName}</h4>
            
            <div className="mt-4">
              <p className="text-sm text-center text-gray-700">{product.description}</p>
            </div>  
          </div>
        </div>    
      </div>
     );
}
 
export default ProductCategory;