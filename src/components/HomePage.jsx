import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { SearchBar } from './SearchBar';
import { fetchProductData } from '../API/getProductData';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './ProductCard.css'
function HomePage() {
    const cartItems = useSelector(state => state.cart.items);
    console.log(cartItems.length);
    const [products, setProducts] = useState([]);
    const [productsCopy, setProductsCopy] = useState([]);
    const navigate = useNavigate()
    const [minPrice, setMinPrice] = useState(0); // Initial minPrice set to 0
    const [maxPrice, setMaxPrice] = useState(2000);
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchData() 
    }, []);

    async function fetchData() {
        try {
            const response = await fetchProductData();
            console.log(response, 'response');
            if (response && response.data && response.data.products) {
                setProducts(response.data.products);
                setProductsCopy(response.data.products);

            } else {
                console.error('No data found in the API response.');

            }
        } catch (error) {

        }
    }
    const filteredProducts = products.filter(product => {
        const isInPriceRange = product.price >= minPrice && product.price <= maxPrice;
        const isMatchingCategory = !category || product.category === category;
        return isInPriceRange && isMatchingCategory;
    });
    function handleCartNav() {
        navigate("/cart")
    }



    return (
        <>
            <div className='' style={{ marginBottom: "100px" }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-secondary fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Thunder</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-5">
                                <li className="nav-item">
                                    <label className="nav-link">Price Range:</label>
                                    <select className="form-select" value={`${minPrice}-${maxPrice}`} onChange={e => {
                                        const value = e.target.value;
                                        let min, max;
                                        switch (value) {
                                            case "0-100":
                                                min = 0;
                                                max = 100;
                                                break;
                                            case "100-200":
                                                min = 100;
                                                max = 200;
                                                break;
                                            case "200-500":
                                                min = 200;
                                                max = 500;
                                                break;
                                            case "500-1000":
                                                min = 500;
                                                max = 1000;
                                                break;
                                            case "1000":
                                                min = 1000;
                                                max = 2000; // or set to a higher value if needed
                                                break;
                                            default:
                                                min = 0;
                                                max = 2000;
                                                break;
                                        }
                                        setMinPrice(min);
                                        setMaxPrice(max);
                                    }}>
                                        <option value="2000">All  </option>
                                        <option value="0-100">$1 - $100</option>
                                        <option value="100-200">$100 - $200</option>
                                        <option value="200-500">$200 - $500</option>
                                        <option value="500-1000">$500 - $1000</option>
                                        <option value="1000">$1000+</option>
                                    </select>
                                </li>

                                <li className="nav-item">
                                    <label className="nav-link">Category:</label>
                                    <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="">All</option>
                                        <option value="smartphones">Mobile</option>
                                        <option value="groceries">groceries</option>
                                        <option value="skincare">skincare</option>
                                        <option value="home-decoration">home-decoration</option>
                                    </select>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <SearchBar products={products} setProducts={setProducts} productsCopy={productsCopy} />
                            </div>
                            <div className="mx-2">
                                <span onClick={handleCartNav}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "25px", height: "25px", position: "relative" }} width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                    </svg>
                                    <sup> <span style={{ fontSize: "15px", position: "absolute", zIndex: "49", top: "0px", right: "0px", color: "white", borderRadius: "50%", width: "15px", height: "21px", cursor: "pointer" }}>
                                        {cartItems.length}
                                    </span></sup>

                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="">
                <h1>Thunder Product Store</h1>
                {
                    !filteredProducts.length ? <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "10%" }}>
                        <CircularProgress />
                    </Box> : <div className="cantainer-card" style={{}}>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                }
            </div>
        </>
    );
}

export default HomePage;

