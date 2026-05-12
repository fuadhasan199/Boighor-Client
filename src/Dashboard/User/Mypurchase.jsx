import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const Mypurchase = () => {  
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/orders?email=${user.email}`)
                .then(res => {
                    setOrders(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user?.email]);
    if (loading) return <p className="text-center mt-10">Loading orders...</p>;
 return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-200 rounded-md mt-2"> 
            <h2 className="text-2xl font-bold mb-5">My Orders: {orders.length}</h2>
            
            <div className="grid gap-4">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-primary">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-lg">Order ID: {order.transactionId || order._id.slice(-6)}</p>
                                    <p className="text-gray-600">Total: ৳ {order.totalPrice}</p>
                                    <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                                        {order.paymentStatus}
                                    </span>
                                    <p className="text-sm mt-1 capitalize">Method: {order.paymentMethod}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default Mypurchase;