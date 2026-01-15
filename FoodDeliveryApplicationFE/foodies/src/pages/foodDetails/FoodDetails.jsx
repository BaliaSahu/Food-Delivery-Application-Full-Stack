import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { fetchFoodDetails } from "../../service/FoodService";
import {toast} from 'react-toastify'

const FoodDetails = () => {

    const {increaseQuantity}=useContext(StoreContext);
    const navigate=useNavigate();

    const { id } = useParams();
    console.log(id);
    const [data, setData] = useState({});

    const fetchData = async (id) => {
        try {
            const data = await fetchFoodDetails(id);
            setData(data);
        } catch (error) {
            console.log(error)
            toast.error("Error Displaying The Food Details!");
        }
    }
    useEffect(() => {
        fetchData(id);
    }, [id])

    const addToCart=(id)=>{
        increaseQuantity(id);
        navigate("/cart")
    }

    return (
        data &&<section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img style={{borderRadius:"20px"}} className="card-img-top mb-5 mb-md-0" src={data.imageUrl} alt="..." /></div>
                    <div className="col-md-6">
                        <div className="small mb-1">Category: {data.category}</div>
                        <h1 className="display-5 fw-bolder">{data.name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through">₹{data.price + 100}</span>
                            <span> ₹{data.price}</span>
                        </div>
                        <p className="lead">{data.description}</p>
                        <div className="d-flex">
                            <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={()=>addToCart(id)} >
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default FoodDetails;