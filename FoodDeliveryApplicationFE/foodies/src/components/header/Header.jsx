import { Link } from "react-router-dom";
import "./header.css"
const Header = () => {

    return (
        <div className="p-5 mb-4 bg-light rounded-3 mt-1 header">
            <div className="container-fluid py-5 " >
                <h1 className="display-5 fw-bold">
                    Order your favourite food here.
                </h1>
                <p className="col-md-8 fs-4">
                    Discover the best food and drinks in <span style={{ fontSize: "30px", color: "green", fontWeight: "400" }}>
                        Bhubaneswar
                    </span>
                </p>
                <Link to="/explore" style={{ backgroundColor: "blue", borderRadius: "10px", height: "30px", color: "white", fontSize: "20px", padding: "8px", textDecoration: "none" }} className="">Explore</Link>
            </div>
        </div>
    )
}
export default Header;