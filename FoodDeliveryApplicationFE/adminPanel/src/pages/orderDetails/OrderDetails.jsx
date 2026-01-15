import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { orderDelete, orderDetailsFetch, updateOrderStatus } from "../../service/orderService";


const OrderDetails = () => { 

    const { orders, token } = useContext(StoreContext)
    const [orderDetails, setOrderDetails] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();


    const updateStatus = async (ide, status) => {
        console.log(ide, status);
        try {
            const res = await updateOrderStatus(ide, status, token);
            if (res.status === 200) {
                toast.success("Food Order Status Changed Successfully.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Food Order Status Not Updated");
        }
    }
    const deleteOrder = async (ide) => {
        console.log(ide);
        try {
            const res = await orderDelete(ide, token);
            if (res.status == 200) {
                toast.success("Food Order Deleted Successfully.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Food Order Not Deleted");
        }
    }
    const fetchOrderDetails = async () => {
        try {
            if (!token) {
                throw new Error("Please Login");
            }
            if (!id) {
                throw new Error("Invalid Request");
            }
            const res = await orderDetailsFetch(id, token);
            if (res.status === 200) {
                // console.log(res.data);
                setOrderDetails(res.data);
            }
        } catch (error) {
            navigate("/login");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchOrderDetails();
    }, [])

    return (
        <div>
            <div className="container" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h1 className="my-4">Order Details

                </h1>
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="my-3">{orderDetails.name}</h3>
                        <p>{orderDetails.address}</p>
                        <p className="my-3">Email id : {orderDetails.email}</p>
                        <p className="my-3">Mobile : {orderDetails.mobile}</p>
                        <p className="my-3">Order Date : {orderDetails.orderDate}</p>
                        <p className="my-3">Status : {orderDetails.status}</p>
                        <p className="my-3">Amount : &#8377;{orderDetails.amount}</p>
                    </div>
                    <div className="d-flex gap-3 mb-4 flex-wrap">
                        <h2>Actions : </h2>
                        <button onClick={() => updateStatus(orderDetails.id, "delivered")} className="btn btn-primary px-4 rounded-pill">
                            Delivered
                        </button>
                        <button onClick={() => updateStatus(orderDetails.id, "not deliverable")} style={{ fontSize: "15px", display: "flex", alignItems: "center" }} className="btn btn-success px-3 rounded-pill">
                            Not Deliverable
                        </button>
                        <button onClick={() => updateStatus(orderDetails.id, "processing")} className="btn btn-warning px-4 rounded-pill">
                            Processing
                        </button>
                        <button onClick={() => updateStatus(orderDetails.id, "cancel")} className="btn btn-danger px-4 rounded-pill">
                            Cancel
                        </button>
                        <button onClick={() => deleteOrder(orderDetails.id)} className="btn btn-secondary px-4 rounded-pill">
                            Delete
                        </button>
                    </div>

                </div>

                <h3 className="my-4">Food Items</h3>

                <div className="row">

                    {orderDetails.orderResponse && orderDetails.orderResponse.map((e) => {
                        return (
                            <div key={e.id} style={{ backgroundColor: "#f2f7f2", borderRadius: "10px", margin: "10px", width: "200px" }} className="col-md-3 col-sm-6 mb-4">
                                <div href="#">
                                    <img style={{ height: "200px", width: "200px", borderRadius: "20px" }} className="img-fluid" src={e.imageUrl} alt="" />
                                </div>
                                <div>
                                    <p>Quantity : {e.num}</p>
                                    <p>Name : {e.name}</p>
                                    <p>Price : &#8377;{e.price}</p>
                                    <p>Category : {e.category}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>

        </div>
    )
}
export default OrderDetails;