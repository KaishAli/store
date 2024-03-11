import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';

function BuyNow() {
    const [open, setOpen] = React.useState(false);
    const cartItemsBuy = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const rest = cartItemsBuy.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
    }, 0);

    function calculateGST(value) {
        return (value * 28) / 100
    }
    console.log(cartItemsBuy, 'cartItemsBuy');

    const Gst = calculateGST(rest)
    const grandTotal = Math.floor(rest + Gst + 10);

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
            <h2>Buy Now</h2>
            <div className='t-5' style={{ marginBottom: "20px" }}><button onClick={handleBack} className="btn btn-success" >Back</button></div>
            <>
                <ul className="list-group mb-3">

                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img
                                src={cartItemsBuy && cartItemsBuy.length > 0 && cartItemsBuy[0].images
                                    ? cartItemsBuy[0].images[0]
                                    : "/placeholder-image.png"}
                                alt="item"
                                style={{ width: "50px", height: "50px", marginRight: "10px" }}
                            />

                            <div>
                                <div>
                                    <h6 className="mb-0">{!cartItemsBuy ? "No Data" : cartItemsBuy.length > 0 ? cartItemsBuy[0].title : "No Data"}</h6>
                                    <p className="mb-0">${!cartItemsBuy ? "No Data" : cartItemsBuy.length > 0 ? cartItemsBuy[0].description : "No Data"}</p>
                                    <span>{!cartItemsBuy ? "No Data" : cartItemsBuy.length > 0 ? cartItemsBuy[0].descriptionD : "No Data"}</span>
                                </div>

                            </div>
                        </div>
                    </li>
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
        </div>

    );
}

export default BuyNow;

