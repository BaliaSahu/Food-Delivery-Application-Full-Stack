import React, { useRef } from 'react'
// import salad from '../../assets/salad'
import salad from '../../assets/salad.avif'
import rice from '../../assets/rice.avif'
import biryani from '../../assets/biryani.avif'
import burger from '../../assets/burger.avif'
import cake from '../../assets/cake.avif'
import icecream from '../../assets/icecream.avif'
import pizza from '../../assets/pizza.avif'
import rolls from '../../assets/rolls.avif'


const ExploreMenu = ({category,setCategory}) => {

  const categories = [
    {
      category: 'cake',
      icon: cake
    },
    {
      category: 'rice',
      icon: rice
    },
    {
      category: 'salad',
      icon: salad
    },
    {
      category: 'biryani',
      icon: biryani
    },
    {
      category: 'burger',
      icon: burger
    },
    {
      category: 'ice cream',
      icon: icecream
    },
    {
      category: 'pizza',
      icon: pizza
    },
    {
      category: 'rolls',
      icon: rolls
    },{
      category:"ALL",
      icon:""
    }
  ]

  const menuRef=useRef(null);
  const leftScroll=()=>{
    if(menuRef.current){
      menuRef.current.scrollBy({left:-100, behavior: 'smooth'});
    }
  }
  const rightScroll=()=>{
    if(menuRef.current){
      menuRef.current.scrollBy({left:100, behavior:'smooth'})
    }
  }

  return (
    <div className='explore-menu position-relative' >
      <h1 className='d-flex align-items-center justify-content-between' >
        Explore Our menu
        <div className='d-flex'>
          <i className='bi bi-arrow-left-circle scroll-icon' style={{cursor:"pointer"}} onClick={leftScroll}></i>
          <i className='bi bi-arrow-right-circle scroll-icon' style={{cursor:"pointer"}} onClick={rightScroll}></i>
        </div>
      </h1>
      <p>
        Explore curated lists of dishes from top categories
      </p>
      <div className='d-flex justify-content-between item-center gap-4 overflow-auto explore-menu-list' ref={menuRef} >
        {
          categories.map((e,i)=>{
            return(
              <div key={i} className='text-center item-center explore-menu-list-item'>
                {e.icon ==="" ?<button style={{marginTop:"30px"}} className='btn btn-primary' onClick={()=> setCategory("All")}>ALL</button> : <img src={e.icon}  alt="" height={100} width={100} onClick={()=> setCategory(e.category)}  className='rounded-circle '/>}
                {e.category ==="ALL" ?"": <p className='mt-2 fw-bold'>{e.category}</p>}
              </div>
            )
          }) 
        }

      </div>

    </div>
  )
}

export default ExploreMenu