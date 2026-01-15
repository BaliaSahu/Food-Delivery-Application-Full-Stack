
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const [token, setToken] = useState(()=>localStorage.getItem("token")||"");
    const[orders,setOrders]=useState(()=>{
        const orderss=localStorage.getItem("orders");
        // console.log(orderss)
        return orderss ? JSON.parse(orderss) :[];
    });

    useEffect(()=>{
        if(token){
            // console.log("Token updated",token)
            localStorage.setItem("token",token);
        }
        if(orders){
            localStorage.setItem("orders",JSON.stringify(orders));
        }
    },[token,orders])

    const contextValue = {
        token,
        setToken,
        orders,
        setOrders
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};
