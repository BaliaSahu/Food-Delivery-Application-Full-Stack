
import ExploreMenu from "../../components/explore/ExploreMenu";
import FoodDisplay from "../../components/foodDisplay/FoodDisplay";
import Header from "../../components/header/Header";
import {useState} from "react"

const Home=()=>{

    const [category,setCategory]=useState("All");
    console.log("Home "+category)
    return(
        <div className="p-5" style={{
            marginLeft:"15px",
            marginRight:"15px"
        }} >
            <Header></Header>
            <ExploreMenu category={category} setCategory={setCategory} ></ExploreMenu>
            <FoodDisplay category={category} ></FoodDisplay>
        </div>
    )
}
export default Home;