import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import logo from "../../assets/software-engineer.png"

const Menubar = ({ toggleSidebar }) => {

    const { token, setToken, setOrders } = useContext(StoreContext);

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.setItem("token", "")
        setToken("");
        setOrders([]);
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
                <div className="sidebar-heading border-bottom bg-light">
                    <img style={{ height: "40px", paddingRight: "10px" }} src={logo} alt="" />
                    Admin</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div style={{ width: "100%" }} className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0" style={{ width: "100%" }}>

                        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/add">
                            <i className="bi bi-plus-square"></i> Add Food</Link>

                        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list">
                            <i className="bi bi-list-task"></i> List Food</Link>
                        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/orders">
                            <i className="bi bi-cart"></i> Orders</Link>
                        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/messages">
                            <i className="bi bi-cart"></i> Messages</Link>
                        {!token && <button onClick={() => navigate("/login")} className='btn btn-primary' style={{ width: "60%", "marginBottom": "10px", "marginRight": "5px" }}>Sign In</button>}
                        {token && <button onClick={() => logOut()} className='btn btn-danger' style={{ width: "60%", "marginBottom": "10px", "marginRight": "10px" }} >Sign Out</button>}
                        {!token && <button className='btn btn-success' style={{ width: "60%", "marginBottom": "10px" }} >Sign up</button>}
                    </ul>

                </div>

            </div>
        </nav>
    )
}

export default Menubar