import React, { useContext, useEffect } from "react";
import './cart.css'
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import { calculateCart } from "../../utils/cartUtils";

const Cart = () => {

    const { foodList, quantity, setQuantity, decreaseQuantity, increaseQuantity, cartItemss, setCartItemss } = useContext(StoreContext);


    // console.log(quantity);
    let cartItems = foodList.filter((e) => quantity[e.id] > 0)
    console.log(cartItems);

    const { subTotal, total, tax, shipping } = calculateCart(cartItems, quantity);



    return (

        <div className="container py-5">
            <h1 className="mb-5">Your Shopping Cart</h1>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            {
                                cartItems.map((e, i) => {
                                    return (<div key={i} className="row cart-item mb-3">
                                        <div className="col-md-3">
                                            <img src={e.imageUrl} alt="Product 1" height={100} className="img-fluid rounded" />
                                        </div>
                                        <div className="col-md-5">
                                            <h5 className="card-title">{e.name}</h5>
                                            <p className="text-muted">Category: {e.category}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="input-group">
                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(e.id)} type="button">-</button>
                                                <input style={{ maxWidth: "100px" }} type="text" className="form-control  form-control-sm text-center quantity-input" value={quantity[e.id]} />
                                                <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => increaseQuantity(e.id)} >+</button>
                                            </div>
                                        </div>
                                        <div className="col-md-2 text-end">
                                            <p className="fw-bold">₹{e.price * quantity[e.id]}</p>
                                            <button onClick={() => setQuantity((prev) => ({
                                                ...prev,
                                                [e.id]: 0
                                            }))} className="btn btn-sm btn-outline-danger">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>)
                                })
                            }

                        </div>
                    </div>
                    <div className="text-start mb-4">
                        <Link to="/" className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                        </Link>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card cart-summary">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>₹{subTotal}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Shipping</span>
                                <span>₹{shipping}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tax</span>
                                <span>₹{tax}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <strong>Total</strong>
                                <strong>₹{total}</strong>
                            </div>
                            <Link className="btn btn-primary w-100" to="/order" >Proceed to Checkout</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Cart;