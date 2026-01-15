import axios from "axios"

const API_URL = "https://foodcourt-backend-beob.onrender.com";

export const createOrder = async (data, token) => {
    try {
        const res = await axios.post(API_URL + "/create/order", data,
            {
                "headers": { "Authorization": "Bearer " + token }
            }
        );
        return res;
    } catch (error) {
        throw new Error("Order not placed." + error);
    }
}
export const messageSend = async (data, token) => {

    const res = await axios.post(API_URL + "/send/message", data,
        {
            "headers": { "Authorization": "Bearer " + token }
        }
    );
    return res;

}