import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaWallet, FaShoppingBag, FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';


const UserHome = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalSpent: 0,
        cartItems: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
           
            axios.get(`http://localhost:3000/user-stats/${user.email}`)
                .then(res => {
                    setStats(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-bars loading-lg text-blue-600"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen rounded-xl">
           
            <div className="flex flex-col md:flex-row items-center gap-4 mb-10 bg-white p-6 rounded-2xl shadow-sm">
                {user?.photoURL ? (
                    <img className="w-20 h-20 rounded-full border-4 border-blue-100 shadow-sm" src={user.photoURL} alt="Profile" />
                ) : (
                    <FaUserCircle className="text-7xl text-gray-300" />
                )}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Hi, <span className="text-blue-600">{user?.displayName || 'User'}</span>!
                    </h2>
                    <p className="text-gray-500 italic">Welcome to your personal dashboard.</p>
                </div>
            </div>

          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
           
                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-blue-500 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase">My Orders</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.totalOrders}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                            <FaShoppingBag size={28} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-green-500 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase">Total Spent</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">৳ {stats.totalSpent}</h3>
                        </div>
                        <div className="p-3 bg-green-50 text-green-500 rounded-xl">
                            <FaWallet size={28} />
                        </div>
                    </div>
                </div>

               
                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-orange-500 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase">Cart Items</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.cartItems}</h3>
                        </div>
                        <div className="p-3 bg-orange-50 text-orange-500 rounded-xl">
                            <FaShoppingCart size={28} />
                        </div>
                    </div>
                </div>

            </div>

            
            <div className="mt-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Account Information</h3>
                <div className="space-y-3">
                    <p className="text-gray-600"><span className="font-semibold">Email:</span> {user?.email}</p>
                    <p className="text-gray-600"><span className="font-semibold">Account Status:</span> <span className="badge badge-success badge-outline">Active</span></p>
                </div>
            </div>
        </div>
    );
};

export default UserHome;