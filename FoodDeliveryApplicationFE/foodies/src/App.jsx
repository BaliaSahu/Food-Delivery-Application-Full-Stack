import Menubar from "./components/menubar/Menubar";
import ContactUs from "./pages/contactus/ContactUs";
import ExploreFood from "./pages/exploreFood/ExploreFood";
import Home from "./pages/Home/Home";
import { Route,Routes } from "react-router-dom";
import Header from "./components/header/Header";
import FoodDetails from "./pages/foodDetails/FoodDetails";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { ToastContainer, toast } from 'react-toastify';
import MyOrders from "./pages/myOrders/MyOrders";

const App=()=>{
  return(
    <div>
      <Menubar></Menubar>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/" element={<Home></Home>} ></Route>
        <Route path="/explore" element={<ExploreFood></ExploreFood>}></Route>
        <Route path="/contact" element={<ContactUs></ContactUs>} ></Route>
        <Route path="/food/:id" element={<FoodDetails></FoodDetails>} ></Route>
        <Route path="/cart" element={<Cart></Cart>} ></Route>
        <Route path="/order" element={<PlaceOrder></PlaceOrder>} ></Route>
        <Route path="/login" element={<Login></Login>} ></Route>
        <Route path="/register" element={<Register></Register>} ></Route>
        <Route path="/myorders" element={<MyOrders></MyOrders>} ></Route>
      </Routes>
    </div>
  )
}
export default App;