import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/FoodService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [foodList, setFoodList] = useState([]);
    const [quantity, setQuantity] = useState(() => {
        const saved = localStorage.getItem("quantity");
        return saved ? JSON.parse(saved) : {};
    });
    const [orders,setOrders]=useState([]);
    const [token, setToken] = useState("");

    const [cartItemss, setCartItemss] = useState([]); 

    const increaseQuantity = (id) => {
        setQuantity((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
    }
    const decreaseQuantity = (id) => {
        setQuantity((prev) => ({ ...prev, [id]: prev[id] > 0 ? prev[id] - 1 : 0 }))
    }

    const removeFromCart = (id) => {
        setQuantity((prev) => {
            const updatedQuantities = { ...prev };
            delete updatedQuantities[id];
            return updatedQuantities;
        })
    }

    useEffect(() => {
        console.log("AAYAYAYYA")
        async function loadData() {
            const data = await fetchFoodList();
            setFoodList(data);
            if (localStorage.getItem("token")) {

                setToken(localStorage.getItem("token"));
            }
            if (localStorage.getItem("quantity")) {
                //  console.log(localStorage.getItem("quantity"))
                setQuantity(JSON.parse(localStorage.getItem("quantity")));
            }
        }
        loadData();
    }, [])
    useEffect(() => {
        console.log("AYAYAYAYA---QUANTITY")
        console.log(quantity)
        localStorage.setItem("quantity", JSON.stringify(quantity));
    }, [quantity])

    const contextValue = {
        foodList,
        quantity,
        increaseQuantity,
        decreaseQuantity,
        setQuantity,
        cartItemss,
        setCartItemss,
        token,
        setToken,
        orders,
        setOrders
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}