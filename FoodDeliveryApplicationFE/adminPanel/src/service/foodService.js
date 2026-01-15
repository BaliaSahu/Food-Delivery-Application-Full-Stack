import axios from "axios";

const API_URL = 'https://foodcourt-backend-beob.onrender.com'
import { toast } from "react-toastify";

export const addFood = async (foodData, image,token) => {
    // console.log(foodData);
    // console.log(image);

    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(foodData)], { type: "application/json" }));
    formData.append("image", image);

    try {
        const res = await axios.post(API_URL + "/add/food", formData, { headers: { "Content-Type": "multipart/form-data",Authorization:"Bearer "+token } });
        // console.log(res);
        return res;
    } catch (error) {
        // console.log("Error Encountered" + error);
        toast.error("Error Encountered in adding food ,"+error);
    }

}

export const getFoodList = async (token) => {
    try {
        const res = await axios.get(API_URL + "/admin/read/foods",{
            headers:{Authorization:"Bearer "+token}
        });
        console.log(res);

        if (res.status == 200) {
            return res;
        } else {
            toast.error("Error While Reading the foods");
        }
    } catch (error) {
        // console.log(error);
    }
}

export const removeFoodItem = async (id,token) => {
    const res = await axios.delete(API_URL+"/delete/" + id,{
        headers:{Authorization:"Bearer "+token}
    });
    return res.status == 200;
}
export const getMessages = async (token) => {
    
        const res = await axios.get(API_URL + "/read/message",{
            headers:{Authorization:"Bearer "+token}
        });
        return res;
}

export const messageDelete = async (id,token) => {
    
        const res = await axios.delete(API_URL + "/delete/message/"+id,{
            headers:{Authorization:"Bearer "+token}
        });
        return res;
}
export const messageUpdate = async (id,status,token) => {
    
        const res = await axios.patch(API_URL + "/update/message/"+status+"/"+id,{},{
            headers:{Authorization:"Bearer "+token}
        });
        return res;
}