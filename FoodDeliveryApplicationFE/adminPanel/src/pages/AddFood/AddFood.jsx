import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { addFood } from "../../service/foodService";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const AddFood = () => {

    const { token } = useContext(StoreContext);
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(Number);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [])

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const food = {
            name, price, description, category
        }
        try {
            if (!token) {
                navigate("/login");
                throw new Error("Please login");
            }
            const res = await addFood(food, image, token);

            if (res.status == 200) {
                toast.success('Food Added Successfully!')
                setName("");
                setPrice(0);
                setDescription("");
                setCategory("");
                setImage(null);
            }

        } catch (error) {
            toast.error("Error in Adding Food." + error);
        }

    }

    return (
        <div>
            <div className="mt-2 mx-2">
                <div className="row mt-20">
                    <div className="col-md-4">
                        <div className="card-body">
                            <h2 className="mb-4">Add Food</h2>
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3 flex" style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                                    {image && <img src={URL.createObjectURL(image)} width={100} alt="" />}
                                    <input type="file" required className="image" id="image" onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input placeholder="Write Name here..." onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control" id="name" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea placeholder="Write Content Here..." onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" id="description" rows="5" required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select onChange={(e) => setCategory(e.target.value)} value={category} name="category" id="category" className="form-control">
                                        <option value="">Select</option>
                                        <option value="Biryani">Biryani</option>
                                        <option value="Cake">Cake</option>
                                        <option value="Burger">Burger</option>
                                        <option value="Pizza">Pizza</option>
                                        <option value="Salad">Salad</option>
                                        <option value="Ice Cream">Ice Cream</option>
                                        <option value="Rice">Rice</option>
                                        <option value="Paneer">Paneer</option>
                                        <option value="Chicken">Chicken</option>
                                        <option value="Currry">Curry</option>
                                        <option value="Drinks">Drinks</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input placeholder="100" value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" id="price" required />
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddFood;