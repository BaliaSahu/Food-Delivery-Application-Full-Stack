import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getFoodList } from "../../service/foodService";
import { removeFoodItem } from "../../service/foodService";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const ListFood = () => {

    const { token } = useContext(StoreContext);
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const fetchList = async () => {
        try {
            if (!token) {
                navigate("/login");
                throw new Error("Please Login");
            }
            const res = await getFoodList(token);
            if (res.status === 200) {
                setList(res.data);
            }
        } catch (error) {
            // console.log(token)
            console.log(error);
            toast.error("Error Encounterd while fetching details " + error);
        }


    }
    const removeFood = async (id) => {
        try {
            if (!token) {
                navigate("/login");
                throw new Error("Please Login");
            }
            const st = await removeFoodItem(id, token);
            if (st) {
                await fetchList();
                toast.success("Removed Successfully.");
            }
            else {
                console.log("hihi")
                toast.error("Error while Removing The Food!!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error Encountered while Deleteing food " + error);
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <div className="py-5 row justify-content-center">
            <div className="col-11 card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.length > 0 ? (
                                list.map((e, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img src={e.imageUrl} height={40} width={40} alt="" />
                                            </td>
                                            <td>
                                                {e.name}
                                            </td>
                                            <td>{e.category}</td>
                                            <td>&#8377;{e.price}.00</td>
                                            <td className="text-danger">
                                                <i className="bi bi-x-circle-fill" onClick={() => removeFood(e.id)} ></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (<tr><td> No Food Items Present! </td></tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ListFood;