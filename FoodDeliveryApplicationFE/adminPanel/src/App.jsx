import { Route, Routes } from "react-router-dom";
import AddFood from "./pages/AddFood/AddFood";
import Orders from "./pages/Orders/Orders";
import ListFood from "./pages/ListFood/ListFood"
import Menubar from "./components/menubar/Menubar";
import Sidebar from "./components/sidebar/Sidebar";
import {ToastContainer} from "react-toastify"
import { useState } from "react";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import AllMessage from "./pages/messages/AllMessage";

const App=()=>{

  const [sidebarVisible,setSidebarVisible]=useState(true);

  const toggleSidebar=()=>{
    setSidebarVisible(!sidebarVisible);
  }

  return(
     <div className="d-flex" id="wrapper">
            
            <Sidebar sidebarVisible={sidebarVisible} ></Sidebar>
            <div id="page-content-wrapper">
               <Menubar toggleSidebar={toggleSidebar}></Menubar>
               <ToastContainer></ToastContainer>
                <div className="container-fluid">
                    <Routes>
                      <Route path="/add" element={<AddFood></AddFood>}></Route>
                      <Route path="/list" element={<ListFood></ListFood>} ></Route>
                      <Route path="/orders" element={<Orders></Orders>}></Route>
                      <Route path="/" element={<ListFood></ListFood>}></Route>
                      <Route path="/login" element={<Login></Login>}></Route>
                      <Route path="/orderdetails/:id" element={<OrderDetails></OrderDetails>} ></Route>
                      <Route path="/messages" element={<AllMessage></AllMessage>} ></Route>
                    </Routes>
                </div>
            </div>
    </div>
  )
}
export default App; 