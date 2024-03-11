import React from 'react';


export function SearchBar({ products, productsCopy, setProducts }) {
    const debounceIdRef = React.useRef('');
    function handleSearch(event) {
        clearTimeout(debounceIdRef.current);
        debounceIdRef.current = setTimeout(() => {
            if (event.target.value.trim() == '') {
                setProducts(productsCopy)
            }
            else {
                const arr = filterProducts(event.target.value, products);
                setProducts(arr)
                console.log(arr, 'fajkgfjka')
            }
        }, 400);
    }

    function filterProducts(value, products) {

        const filteredArr = products.filter((product) => {
            return product.title.toLowerCase().includes(value)
        })
        return filteredArr;
    }
    return (
        <>
            <input placeholder='Search Products' onChange={handleSearch} />
        </>
    )
}