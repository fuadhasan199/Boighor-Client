import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import axios from 'axios'; 
import Swal from 'sweetalert2';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);

   
    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/cart?email=${user.email}`)
                .then(res => {
                    setCart(res.data);
                })
                .catch(err => console.error("Cart loading error:", err));
        } else {
            setCart([]);
        }
    }, [user?.email]); 

   
    const removeFromCart = (id) => {
        const remaining = cart.filter(item => item._id !== id);
        setCart(remaining);
    };

    
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
            price: product.price,
            image: product.image 
        };

        try {
            const res = await axios.post('http://localhost:3000/cart', item);
            
            if (res.data.insertedId) {
                
                const newItem = { ...item, _id: res.data.insertedId };
                setCart(prev => [...prev, newItem]);
                
                Swal.fire({
                    
                    icon: "success",
                    title: "Added to cart",
                    showConfirmButton: false,
                   
                });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            Swal.fire("Error", "Could not add to cart", "error");
        }
    };

    return (
        <CartContext value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext>
    );
};

export default CartProvider;