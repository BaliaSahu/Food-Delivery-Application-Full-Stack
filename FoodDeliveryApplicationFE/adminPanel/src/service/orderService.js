import axios from "axios";

const API_URL = 'https://foodcourt-backend-beob.onrender.com'
import { toast } from "react-toastify";

export const orderDetailsFetch = async (id, token) => {
    const res = await axios.get(API_URL + "/order/details/" + id, {
        "headers": { Authorization: "Bearer " + token }
    })
    return res;
}
export const orderDelete = async (ide, token) => {
    const res = await axios.delete(API_URL + "/order/" + ide, {
        headers: { Authorization: "Bearer " + token }
    });

    return res;
}

export const updateOrderStatus = async (ide, status, token) => {
    const res = await axios.patch(API_URL + "/order/" + ide + "/" + status, {}, {
        headers: { Authorization: "Bearer " + token }
    });
    return res;
}


export const fetchOrdersService = async (token) => {
    const res = await axios.get(API_URL + "/all/orders", {
        headers: { "Authorization": "Bearer " + token }
    })
    return res;
}
export const loginService = async (data) => {
    const res = await axios.post(API_URL + "/api/admin/login", data);
    return res;
}