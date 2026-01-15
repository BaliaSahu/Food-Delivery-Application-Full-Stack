
import "./Menubar.css"
import logo from '../../assets/logo.png';
import cart from '../../assets/shopping-cart.png'
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import user from '../../assets/user.png'

const Menubar = () => {
    const { token } = useContext(StoreContext);

    const navigate = useNavigate();

    const [active, setActive] = useState("home");

    const { quantity, foodList, setToken } = useContext(StoreContext);

    const count = foodList.filter((e) => quantity[e.id] > 0);

    const logout = () => {
        
        localStorage.setItem("token","");
        setToken("");
        navigate("/login")
    }
    console.log(token.length)

    return (
        <div style={{
            marginLeft: "45px",
            marginRight: "45px"
        }}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={logo} height={30} alt="" />FOOD COURT</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={active === "home" ? "nav-link fw-bold" : "nav-link"} aria-current="page" to="/" onClick={() => setActive("home")} >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={active === "explore" ? "nav-link fw-bold" : "nav-link"} to="/explore" onClick={() => setActive("explore")} >Explore Foods</Link>
                            </li>

                            <li className="nav-item">
                                <Link className={active === "contact" ? "nav-link fw-bold" : "nav-link"} to="/contact" onClick={() => setActive("contact")} >Contact Us</Link>
                            </li>
                        </ul>
                        <div className="menubar-right">
                            <Link to="/cart" style={{
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "center",
                                gap: "10px"
                            }}>
                                <img src={cart} height={30} alt="cart" />
                                <span>{count.length}</span>
                            </Link>
                           {token=="" ? <button className="btn btn-outline-primary" onClick={() => navigate("/login")} >
                                Login
                            </button>:""}
                            {token=="" ? <button className="btn btn-outline-success" onClick={() => navigate("/register")} >
                                Register
                            </button>:""}
                        
                        {token!="" ?<div className="dropdown text-end" >
                            <Link href="" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
                                <img src={user} alt="" width={32} height={32} className="rounded-circle" />
                                <ul className="dropdown-menu text-small">
                                    <li className="dropdown-item" style={{ "cursor": "pointer" }} onClick={() => navigate("/myorders")}>Orders</li>
                                    <li className="dropdown-item" style={{ "cursor": "pointer" }} onClick={() => logout()} >logout</li>
                                </ul>
                            </Link> 
                        </div>:""} 

                    </div>
                </div>
        </div>
            </nav >
        </div >
    )
}
export default Menubar;