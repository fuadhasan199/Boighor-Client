import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';


export const CartContext=createContext()
const CartProvider = ({children}) => { 
const {user}=useContext(AuthContext) 
const [cart,setCart]=useState([]) 

useEffect(()=>{
 
     if(user?.email){
          fetch(`/cart?email=${user.email}`) 
          .then(res=>res.json())
          .then(data=>setCart(data))
     } 
     else{
        setCart([])
     } 
 


},[user]) 


 const addToCart = async (product) => {
    if (!user) {
      Swal.fire("Login first!");
      return;
    } 

    const exists = cart.find(item => item.productId === product._id);
    if (exists) {
      Swal.fire("Already added!");
      return;
    } 

        const item = {
      email: user.email,
      productId: product._id,
      title: product.title,
      price: product.price
    }; 

      await fetch('/cart', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(item) 

    }); 

     setCart(prev => [...prev, item]); 
       };

    return (
      <CartContext value={{ cart, addToCart }}>
      {children}
    </CartContext>
    );
};

export default CartProvider;