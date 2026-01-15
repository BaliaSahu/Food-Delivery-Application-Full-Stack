import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { fetchOrdersService } from "../../service/orderService";

const Orders = () => {

    const { token, orders, setOrders } = useContext(StoreContext);
    const navigate = useNavigate();
    const [filterOrders, setFilterOrders] = useState([]);
    // console.log(orders[0].id)
    const fetchOrders = async () => {
        try {
            if (!token) {
                throw new Error("Please Login");
            }
            const res = await fetchOrdersService(token);
            // console.log(res.data);
            setOrders(res.data);
            setFilterOrders(res.data);
            // console.log(orders)
        } catch (error) {
            toast.error("Error Encountered While fetching order details." + error);
            navigate("/login");
            // console.log(error);
        }
    }
    const updateStatus = (status) => {
        if (status === "all") {
            setFilterOrders(orders)
        }
        else {
            const filterOrder = orders.filter((e) => e.status === status);
            setFilterOrders(filterOrder)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])
    return (
        <div>
            <div className="d-flex gap-3 mb-4 flex-wrap ">
                <h2>Order Status : </h2>
                <button onClick={() => updateStatus("delivered")} className="btn btn-primary px-4 rounded-pill">
                    Delivered
                </button>
                <button onClick={() => updateStatus("not deliverable")} style={{ fontSize: "15px", display: "flex", alignItems: "center" }} className="btn btn-success px-3 rounded-pill">
                    Not Deliverable
                </button>
                <button onClick={() => updateStatus("processing")} className="btn btn-warning px-4 rounded-pill">
                    Processing
                </button>
                <button onClick={() => updateStatus("cancelled")} className="btn btn-danger px-4 rounded-pill">
                    Cancel
                </button>
                <button onClick={() => updateStatus("ordered")} className="btn btn-info px-4 rounded-pill">
                    Ordered
                </button>
                <button onClick={() => updateStatus("all")} className="btn btn-dark px-4 rounded-pill">
                    All
                </button>
            </div>
            <div className="bg-light min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="contact-card bg-white rounded-4 shadow-sm overflow-hidden">
                                <div
                                    className="mb-4 p-3"
                                    style={{ backgroundColor: "#f2f7f2", borderRadius: "15px" }}
                                >
                                    {filterOrders && filterOrders.map((e) => {
                                        return (
                                            <div key={e.id} className="card-body" style={{ marginBottom: "20px" }}>
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
                                                    <div className="btn btn-danger px-4 rounded-pill">
                                                        {e.status}
                                                    </div>
                                                    <div className="btn btn-success px-4 rounded-pill">
                                                        ₹{e.amount}
                                                    </div>
                                                    <button onClick={() => navigate(`/orderdetails/${e.id}`)} className="btn btn-warning px-4 rounded-pill">
                                                        Details
                                                    </button>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    })
                                    }
                                    <div>
                                        <h3>{filterOrders.length == 0 ? "No Orders" : ""}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Orders;