import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '../Alerts/Alert';
function ProductCard({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [message, setMessage] = React.useState({ mess: "", openPop: false })

    const addToCart = () => {
        const isProductInCart = cartItems.some(item => item.id === product.id);
        if (!isProductInCart) {
            dispatch({ type: 'ADD_TO_CART', payload: product });
            setMessage({ mess: "Added To Cart", openPop: true });
            handleClose();
        } else {
            setMessage({ mess: "Already in the Cart", openPop: true });
        }
    };

    function handleNavigateProductDes() {
        const isProductInCart = cartItems.some(item => item.id === product.id);
        if (!isProductInCart) {
            dispatch({ type: 'ADD_TO_CART', payload: product });
        }
        navigate("/BuyNow", { state: product });

    }
    function handleClose() {
        setTimeout(() => {
            setMessage({ openPop: false })
        }, 3000);
    }
    console.log(message, 'kaish');
    return (
        <>
            <Alert
                message={message}
            />
            <div className='cantainer-card'>
                <div className="card">
                    <img src={product.images[0]} alt="productStore" className="photoset" />
                    <div className="container ">
                        <h4 className="hname">{product.title}</h4>
                        <span className="">{product.description}</span>
                        <p className="pname">${product.price}</p>
                    </div>
                    <div className="">
                        <button className="custom_buttonb" onClick={addToCart}>Add To Cart</button>
                        <button className="custom_buttonb" onClick={handleNavigateProductDes}>Buy</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
