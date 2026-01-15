import { useState } from "react";
import FoodDisplay from "../../components/foodDisplay/FoodDisplay";

const ExploreFood=()=>{
    const [category,setCategory]=useState("All")
    const handler=(e)=>{
        e.preventDefault();

    }
    return(
        <div className="container">
            <div className="flex row justify-content-center-center">
                <div className="col-md-6">
                    <form onSubmit={(e)=> handler(e)}>
                        <div className="input-group mb-3" >
                            <select onChange={(e)=> setCategory(e.target.value)} value={category} name="category" id="category" className="form-select mt-2" style={{'maxWidth':'150px'}} >
                                <option value="All">Select</option>
                                <option value="Biryani">Biryani</option>
                                <option value="Burger">Burger</option>
                                <option value="Rice">Rice</option>
                                <option value="Cake">Cake</option>
                                <option value="Ice cream">Ice Cream</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Salad">Salad</option>
                                
                            </select>
                            <input type="text"  onChange={(e)=>setCategory(e.target.value)} className="form-control mt-2" placeholder="Search your favourite dish..." name="" id="" />
                            <button className="btn btn-primary mt-2" type="" >
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <FoodDisplay category={category} ></FoodDisplay>
        </div>
        
    )
}
export default ExploreFood;