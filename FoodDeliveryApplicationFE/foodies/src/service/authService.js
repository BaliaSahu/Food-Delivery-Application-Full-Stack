
import axios from 'axios';
const API_URL = "https://foodcourt-backend-beob.onrender.com";
export const registerService = async (data) => {
    console.log("ASLSLSL", data)
    const response = await axios.post(API_URL + "/api/register", data);
    console.log(response);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error("Registrain failed!");
    }
}

export const loginService = async (data) => {
    const res = await axios.post(API_URL + "/api/login", data);
    // console.log(res);
    if (res.status === 200) {
        return res.data;
    }
    else {
        throw new Error("Invalid Credentials!");
    }
}