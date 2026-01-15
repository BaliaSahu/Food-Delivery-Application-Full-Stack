
import "./placeOrder.css"
import delivery from '../../assets/delivery-man.png'
import { StoreContext } from "../../context/StoreContext";
import { useContext, useState } from "react";
import { calculateCart } from "../../utils/cartUtils";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../service/cartService";
import { placeOrder } from "../../service/myOrdersService";


const PlaceOrder = () => {

    const { foodList,setQuantity, quantity,token } = useContext(StoreContext);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState(0);
    
    const navigate = useNavigate();

    // console.log(quantity);
    let cartItems = foodList.filter((e) => quantity[e.id] > 0)
    console.log(cartItems);

    const { shipping, subTotal, tax, total } = calculateCart(cartItems, quantity);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("AAA___GAYYA")
        const order=[];
        for(let id in quantity){
            if(id.length !=1){order.push({"foodId":id,"num":quantity[id]});}
            
        }
        const data = {
            name, address, mobile,order,"amount":total
        }
        console.log(data);
        try {
            if (token == "") {
                toast.error("Please Login.")
                navigate("/login");
                throw new Error("Please Login");
            }
            // const res = await createOrder(data,token);
            const res=await placeOrder(data,token);
            console.log(res);
            toast.success("Order Placed Successfully");
            setQuantity({});
        } catch (error) {
            console.log(error);
            toast.error("Order Not Placed."+error);
        }
    }


    return (
        <div className="container">
            <div classNameName="container mt-20">
                <main>
                    <div className="row g-5">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img src={delivery} alt="" style={{ marginTop: "10px", height: "100px" }} />
                        </div>
                        <div className="col-md-5 col-lg-4 order-md-last">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary">Your cart</span>
                                <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
                            </h4>

                            <ul className="list-group mb-3">
                                {
                                    cartItems.map((e, i) => {
                                        return (
                                            <li key={i} className="list-group-item d-flex justify-content-between lh-sm">
                                                <div>
                                                    <h6 className="my-0">{e.name}</h6>
                                                    <small className="text-body-secondary">{e.description}</small>
                                                </div>
                                                <span className="text-body-secondary">&#8377;{e.price * quantity[e.id]}</span>
                                            </li>
                                        )
                                    })
                                }
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Shipping</span>
                                    <strong>&#8377;{shipping + ".00"}</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Tax</span>
                                    <strong>&#8377;{tax + ".00"}</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (INR)</span>
                                    <strong>&#8377;{total + ".00"}</strong>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-7 col-lg-8">

                            <h4 className="mb-3">Billing address</h4>

                            <form onSubmit={(e) => submitHandler(e)} className="needs-validation" novalidate>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label htmlFor="fullname" className="form-label">Full name</label>
                                        <input required onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="fullname" />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input required onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" id="address" placeholder="1234 Main St" />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="phone" className="form-label"> Phone Number </label>
                                        <input onChange={(e) => setMobile(e.target.value)} type="number" className="form-control" id="phone" placeholder="Contact Number" required />
                                    </div>

                                    <div className="col-md-5">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <select className="form-select" id="state" required>
                                            <option value="">Choose...</option>
                                            <option>Odisha</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <select className="form-select" id="city" required>
                                            <option value="">Choose...</option>
                                            <option>Bhubaneswar</option>
                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        <label htmlFor="zip" className="form-label">Zip</label>
                                        <input type="text" className="form-control" id="zip" required />
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <button className="w-100 btn btn-primary btn-lg " disabled={cartItems.length === 0} type="submit">Continue to checkout</button>
                            </form>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    )
}
export default PlaceOrder;