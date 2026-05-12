import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import { CartContext } from '../../Provider/CartProvider';

const UserHome = () => {
    const { user } = useContext(AuthContext); 
    const { cart } = useContext(CartContext); 
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalSpent: 0
    });

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/user-stats?email=${user.email}`)
                .then(res => {
                
                    setStats({
                        totalOrders: res.data.totalOrders,
                        totalSpent: res.data.totalSpent
                    });
                })
                .catch(err => console.error("Stats loading error:", err));
        }
    }, [user?.email]);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-8">
                Welcome Back, <span className="text-primary">{user?.displayName || 'User'}</span>!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
           
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <p className="text-gray-500 font-medium uppercase tracking-wider text-xs">Total Orders</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <h3 className="text-4xl font-black text-gray-800">{stats.totalOrders}</h3>
                        <span className="text-gray-400 text-sm">completed</span>
                    </div>
                </div>

              
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <p className="text-gray-500 font-medium uppercase tracking-wider text-xs">Total Spend</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        
                        <h3 className="text-4xl font-black text-gray-800">৳{Number(stats.totalSpent || 0).toFixed(2)}</h3>
                    </div>
                </div>

               
                <div className="bg-primary text-white p-6 rounded-2xl shadow-lg shadow-primary/20 flex flex-col justify-center">
                    <p className="text-white/70 font-medium uppercase tracking-wider text-xs">Items in Cart</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <h3 className="text-4xl font-black">{cart.length}</h3>
                        <span className="text-white/80 text-sm italic">ready to buy</span>
                    </div>
                </div>

            </div>

            <div className="mt-10 p-6 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-600 italic">
                    Log-in as: <span className="font-semibold">{user?.email}</span>
                </p>
            </div>
        </div>
    );
};

export default UserHome;