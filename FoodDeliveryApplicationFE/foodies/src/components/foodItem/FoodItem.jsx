import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = (e) => {
    // console.log(e.e);
    const {quantity,increaseQuantity,decreaseQuantity}=useContext(StoreContext);
    console.log(quantity)
    e=e.e;
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div className="card" style={{}}>
                <Link to={`/food/${e.id}`} ><img src={e.imageUrl} style={{
                    height: "200px",
                    width: "200px",
                    borderRadius:"20px"
                }} className="card-img-top" alt="Product Image" />
                </Link>
                <div className="card-body" style={{ width: "200px" }}>
                    <h5 className="card-title">{e.name}</h5>
                    <p className="card-text">{e.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="h5 mb-0">&#8377;{e.price}</span>
                        <div>
                            <i className="bi bi-star-fill text-warning"></i>
                            <i className="bi bi-star-fill text-warning"></i>
                            <i className="bi bi-star-fill text-warning"></i>
                            <i className="bi bi-star-fill text-warning"></i>
                            <i className="bi bi-star-half text-warning"></i>
                            <small className="text-muted">(4.5)</small>
                        </div>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light">
                    <Link className="btn btn-primary btn-sm" to={`/food/${e.id}`}> View Food </Link>
                    
                    {
                        quantity[e.id] > 0 ?(
                            <div className="d-flex align-items-center gap-2">
                                <button className="btn btn-danger btn-sm" onClick={()=>decreaseQuantity(e.id)} >
                                    <i className="bi bi-dash-circle"></i>
                                </button>
                                <span className="fw-bold">{quantity[e.id]}</span>
                                <button  className="btn btnsuccess btn-sm" onClick={()=>increaseQuantity(e.id)} >
                                    <i className="bi bi-plus-circle" ></i>
                                </button>
                            </div>
                        ):<button className="btn btn-outline-secondary btn-sm"onClick={()=>increaseQuantity(e.id)} ><i className="bi bi-plus-circle"></i></button>
                    }
                </div>
            </div>
        </div>
    )
}
export default FoodItem;