
import axios from 'axios'
import { toast } from 'react-toastify';

const API_URL = "https://foodcourt-backend-beob.onrender.com"

export const fetchFoodList = async () => {

     try {

          const res = await axios.get(API_URL + "/read/foods");
          console.log(res)
          return res.data;

     } catch (error) {
          console.log(error);
          throw error;
     }

}
export const fetchFoodDetails = async (id) => {
     
          const res = await axios.get(API_URL+"/read/" + id);
          if (res.status == 200) {
               return res.data;
          }
    
}