import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { myOrdersService } from "../../service/myOrdersService";
import { cancelOrderWithId } from "../../service/myOrdersService"

const MyOrders = () => {

    const { foodList, token, setOrders, orders } = useContext(StoreContext);
    const navigate = useNavigate();
    const [showItems, setShowItems] = useState(false);
    const getUserOrders = async () => {
        try {
            if (!token) {
                throw new Error("Please Login");
            }

            const res = await myOrdersService(token);

            const newOrders = res.data.map(order => {
                const finalItems = order.order.map(item => {
                    const food = foodList.find(f => f.id === item.foodId);
                    return { ...food, quantity: item.num };
                });

                return { ...order, finalItems };
            });
            console.log(newOrders)
            setOrders(newOrders);

        } catch (error) {
            console.log(error);
            // toast.error("Error in fetching orders." + error);
        }
    };

    useEffect(() => {
        getUserOrders();
    }, []);

    const cancelOrder = async (id) => {
        try {
            if (!token) {
                throw new Error("Please Login");
            }
            const res = await cancelOrderWithId(id, token);
            if (res.status === 200) {
                console.log(res);
                toast.success("Order Cancelled");
                getUserOrders();
            }
        } catch (error) {
            toast.error("Order Not Cancelled");
            console.log(error);
        }
    }

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="contact-card bg-white rounded-4 shadow-sm overflow-hidden">

                            {orders.length > 0 ? (
                                orders.map((e) => (
                                    <div key={e.id}
                                        className="mb-4 p-3"
                                        style={{ backgroundColor: "#f2f7f2", borderRadius: "15px" }}
                                    >
                                        <div className="card-body">

                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h3 className="card-title mb-0 text-primary">{e.name}</h3>
                                                <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                                                    {e.orderDate}
                                                </span>
                                            </div>

                                            <p className="card-text text-muted mb-4">
                                                {e.address}
                                            </p>

                                            <div className="d-flex gap-3 mb-4 flex-wrap">
                                                <button className="btn btn-primary px-4 rounded-pill">
                                                    {e.mobile}
                                                </button>
                                                <div className="btn btn-primary px-4 rounded-pill">
                                                    {e.status}
                                                </div>
                                                <div className="btn btn-primary px-4 rounded-pill">
                                                    ₹{e.amount}
                                                </div>
                                                <div onClick={() => setShowItems(!showItems)} className="btn btn-primary px-4 rounded-pill">
                                                    {showItems == true ? "Hide Details" : "Details"}
                                                </div>
                                                {e.status != "cancelled" ? <button onClick={() => cancelOrder(e.id)} className="btn btn-danger px-4 rounded-pill">
                                                    Cancel Order
                                                </button> : ""}
                                            </div>

                                            {/* Order Items */}
                                            {showItems && <div className="mt-3 p-3 rounded-3" style={{ background: "#eef5ee" }}>
                                                <h5 className="fw-bold mb-3">Order Items</h5>

                                                {e.finalItems && e.finalItems.length > 0 ? (
                                                    e.finalItems.map((item) => {
                                                        if (item.quantity == 0) return "";
                                                        return (<div
                                                            key={item.id}
                                                            className="d-flex align-items-center mb-3 p-2 rounded-3 shadow-sm"
                                                            style={{ background: "white" }}
                                                        >
                                                            <img
                                                                src={item.imageUrl}
                                                                alt={item.name}
                                                                style={{
                                                                    width: "70px",
                                                                    height: "70px",
                                                                    objectFit: "cover",
                                                                    borderRadius: "10px",
                                                                    marginRight: "15px"
                                                                }}
                                                            />

                                                            <div className="flex-grow-1">
                                                                <h6 className="fw-bold mb-1">{item.name}</h6>
                                                                <p className="mb-0 text-muted">Qty: {item.quantity}</p>
                                                            </div>

                                                            <div className="text-end">
                                                                <p className="fw-bold mb-1">₹{item.price}</p>
                                                                <small className="text-muted">
                                                                    Total: ₹{item.price * item.quantity}
                                                                </small>
                                                            </div>
                                                        </div>)
                                                    })
                                                ) : (
                                                    <p>No items found</p>
                                                )}
                                            </div>}

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <h3>No Orders Found!</h3>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;
