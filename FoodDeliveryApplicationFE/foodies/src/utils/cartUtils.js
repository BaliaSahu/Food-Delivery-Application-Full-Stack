
export const calculateCart=(cartItems,quantity)=>{
    
    const subTotal = cartItems.reduce((acc, food) => acc + food.price * quantity[food.id], 0);
    
    const tax=subTotal>0 ? cartItems.length * 5.0:0;
    const shipping =subTotal>0 ? 49:0;
    const total=subTotal+tax+shipping;

    return{subTotal,total,tax,shipping}
}