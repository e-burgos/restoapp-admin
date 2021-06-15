import React, {useState, useEffect} from 'react';

const CategorySearcher = ({filterCategories, getCategories }) => {

    const [search, setSearch] = useState('')

    useEffect(() => {
        if(search !== ''){
            filterCategories(search);
        } else {
            getCategories(localStorage.getItem('userId'))
        };
    // eslint-disable-next-line
    }, [search])

    return (
        <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2"
            >
                <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                    ></path>
                </svg>
            </div>
            <input
                className="w-full pl-8 pr-2 p-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0  rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-black focus:border-purple-300 focus:bg-purple-100 focus:outline-none focus:shadow-outline-purple form-input"
                type="text"
                placeholder="Buscar una categoria"
                onChange={(text) => setSearch(text.target.value)}
            />
        </div>
     );
}
 
export default CategorySearcher;