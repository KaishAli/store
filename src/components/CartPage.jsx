import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const [open, setOpen] = React.useState(false);
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    console.log(cartItems, 'cartItems');
    const removeFromCart = (item) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
    };

    const rest = cartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
    }, 0);
    console.log(rest, 'ghg');

    function calculateGST(value) {
        return (value * 28) / 100
    }
    const Gst = calculateGST(rest)
    const grandTotal = rest + Gst + 10;

    function handleClose() {
        setTimeout(() => {
            setOpen(false);
        }, 300);
    }
    function handleOpen() {
        setOpen(true);
    }
    function handleBack() {
        navigate("/");
    }
    return (
        <div className="container">
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Order has been Placed"
            />
            <h2>Cart</h2>
            <div className='t-5' style={{ marginBottom: "20px" }}><button onClick={handleBack} className="btn btn-success" >Back</button></div>

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul className="list-group mb-3">
                        {cartItems.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img src={item.images[0]} alt={item.title} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                                    <div>
                                        <h6 className="mb-0">{item.title}</h6>
                                        <p className="mb-0">${item.price}</p>
                                        <span>{item.description}</span>
                                    </div>
                                </div>
                                <button className="btn btn-danger" onClick={() => removeFromCart(item)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-light p-3">
                        <div className="d-flex justify-content-between">
                            <div>Total:</div>
                            <div>${rest}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>GST 28%:</div>
                            <div>${Gst}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Shipping Charge:</div>
                            <div>$10</div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Grand Total:</div>
                            <div>${grandTotal}</div>
                        </div>
                        <div><button onClick={handleOpen} className="btn btn-success" >By Now</button></div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;

