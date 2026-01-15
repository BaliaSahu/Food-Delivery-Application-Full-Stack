import axios from "axios";
const API_URL = "https://foodcourt-backend-beob.onrender.com"

export const placeOrder = async (data, token) => {
    const res = await axios.post(API_URL + "/create/order", data, {
        headers: { Authorization: "Bearer " + token }
    })
    return res;
}

export const myOrdersService = async (token) => {
    const res = await axios.get(API_URL + "/all/user/orders", {
        headers: { Authorization: "Bearer " + token }
    });
    return res;
}

export const cancelOrderWithId = async (id, token) => {
    console.log(id + " " + token)
    const res = await axios.post(API_URL + "/cancel/order/" + id, {}, {
        "headers": { Authorization: "Bearer " + token }
    })
    return res;
}