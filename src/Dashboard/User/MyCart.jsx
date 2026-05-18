import React, { useContext } from 'react';
import { CartContext } from '../../Provider/CartProvider'; 
import { FaTrashAlt } from 'react-icons/fa';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';


const MyCart = () => {
 
    const { cart , removeFromCart} = useContext(CartContext);
 const {user}=useContext(AuthContext)
  
    const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price || 0), 0);
const navigate=useNavigate()

const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (res) => { 
            if (res.isConfirmed) {
                try {
                    
                    const token = await user?.getIdToken();

                    const response = await axios.delete(`https://boighorserver.vercel.app/cart/${id}`, {
                        headers: {
                            authorization: `Bearer ${token}` 
                        }
                    });

                    if (response.data.deletedCount > 0) {
                        removeFromCart(id);
                        Swal.fire("Deleted!", "This item has been deleted", "success");
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error!", "Failed to delete item", "error");
                }
            }
        });
    };

    return (
        <div className=" bg-gray-200 min-h-screen rounded-md p-5">
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm border">
                <div>
                    <h2 className="text-xl font-semibold text-gray-600">Total Items</h2>
                    <p className="text-3xl font-bold text-blue-600">{cart.length}</p>
                </div>
                <div className="text-right ">
                    <h2 className="text-xl font-semibold text-gray-600 ">Total Price</h2>
                    <p className="text-2xl font-bold text-green-600 flex items-center gap-1"><FaBangladeshiTakaSign/> {totalPrice.toFixed(2)}</p>
                </div>
            </div>

        
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
                <table className="table w-full bg-white">
                 
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-4">#</th>
                            <th>Book Name</th>
                            <th>Price</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                                    <th>{index + 1}</th>
                                    <td className="font-medium text-gray-800">{item.title}</td>
                                    <td className="text-blue-600 font-semibold flex  items-center gap-1"> <FaBangladeshiTakaSign/> {item.price}</td>
                                    <td className="text-center">
                                        <button  onClick={()=>handleDelete(item._id)}
                                            className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50"
                                            title="Remove Item"
                                        >
                                            <FaTrashAlt size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                         <td colSpan="4" className="text-center py-20 text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                         <span className="text-5xl">🛒</span>
                        <p className="text-lg">Your cart is currently empty!</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

         
            {cart.length > 0 && (
                <div className="mt-8 flex justify-end">
                    <div className="w-full md:w-80 bg-white p-6 rounded-xl border shadow-sm">
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-bold text-gray-800 flex items-center gap-1"><FaBangladeshiTakaSign/> {totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-6 border-t pt-4">
                            <span className="text-lg font-bold">Total Payable</span>
                            <span className="text-lg font-bold text-green-600 flex items-center gap-1"><FaBangladeshiTakaSign/> {totalPrice.toFixed(2)}</span>
                        </div>
                        
                      
                        <button 
                            onClick={() => navigate("/dashboard/CheckOut")}
                            className="btn btn-primary w-full text-white font-bold tracking-wide"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCart;