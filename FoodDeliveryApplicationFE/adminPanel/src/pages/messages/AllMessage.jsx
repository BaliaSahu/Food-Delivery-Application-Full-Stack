import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getMessages, messageDelete, messageUpdate } from "../../service/foodService";

const AllMessage = () => {
    const { token } = useContext(StoreContext);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            if (!token) {
                navigate("/login");
                throw new Error("Please login");
            }
            const res = await getMessages(token);
            console.log(res);
            if (res.status === 200) {
                setMessages(res.data);
                console.log(res);
            }
        } catch (error) {
            toast.error("Error in fetching Messages " + error);
        }
    }
    const deleteMessage = async (id) => {
        try {
            if (!token) {
                navigate("/login");
                throw new Error("Please login");
            }
            const res = await messageDelete(id, token)
            if (res.status === 200) {
                fetchMessages();
            }
        } catch (error) {
            toast.error("Error in Deleting Messages " + error);
        }
    }
    const updateMessage = async (id, status) => {
        try {
            if (!token) {
                navigate("/login");
                throw new Error("Please login");
            }
            const res = await messageUpdate(id, status, token)
            if (res.status === 200) {
                setMessages(res.data);
                fetchMessages();
            }
        } catch (error) {
            toast.error("Error in updating Messages " + error);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [])

    return (
        <div>
            <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="contact-card bg-white rounded-4 shadow-sm overflow-hidden">
                                <div
                                    className="mb-4 p-3"
                                    style={{ backgroundColor: "#f2f7f2", borderRadius: "15px" }}
                                >
                                    {
                                        messages && messages.length > 0 ? (
                                            messages.map((e) => {
                                                return (
                                                    <div key={e.id} className="card-body" style={{marginBottom:"10px"}}>
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <h3 className="card-title mb-0 text-primary">{e.firstName+" "+e.lastName}</h3>
                                                            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                                                                {e.messageDate}
                                                            </span>
                                                        </div>
                                                        <p className="card-text text-muted mb-4">
                                                            Message : {e.message}
                                                        </p>
                                                        <p className="card-text text-muted mb-4">
                                                            Email : {e.email}
                                                        </p>
                                                        <p className="card-text text-muted mb-4">
                                                            Status : {e.status}
                                                        </p>
                                                        <div className="d-flex gap-3 mb-4 flex-wrap">
                                                            <button onClick={()=> updateMessage(e.id,"read")} className="btn btn-info px-4 rounded-pill">
                                                                Read
                                                            </button>
                                                            <button onClick={()=> deleteMessage(e.id)} className="btn btn-warning px-4 rounded-pill">
                                                                Delete
                                                            </button>
                                                        </div>
                                                        
                                                    </div>
                                                )
                                            })
                                        ):(
                                            <p>No Messages yet!</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AllMessage;