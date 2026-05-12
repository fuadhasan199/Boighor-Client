import React, { useContext, useState } from 'react';


import axios from 'axios';
import Swal from 'sweetalert2';


import { CartContext } from '../Provider/CartProvider';
import { AuthContext } from '../Provider/AuthProvider';

const CheckOut = () => {

    const { cart, setCart } = useContext(CartContext);
    const {user}=useContext(AuthContext) 
    

    const [paymentMethod, setPaymentMethod] = useState('cod');

    const totalPrice = cart.reduce(
        (total, item) => total + parseFloat(item.price || 0),
        0
    );

    const handleOrder = async (e) => {

        e.preventDefault();

        const form = e.target;

        const customerName = form.name.value;
        const phone = form.phone.value;
        const address = form.address.value;

        const orderData = {
            customerName,
            phone,
            address,
            email: user?.email,
            totalPrice,
            cartItems: cart
        };



      

        if (paymentMethod === 'cod') {

            const res = await axios.post(
                'http://localhost:3000/cash-on-delivery',
                orderData
            );
 
            if (res.data.success) {

                Swal.fire({
                    icon: 'success',
                    title: 'waiting For Delivery!'
                });
                form.reset()
                setCart([]);
            } 
            

        } 
   



       

        else {

            const res = await axios.post(
                'http://localhost:3000/create-checkout-session',
                orderData
            );
            window.location.replace(res.data.url); 
        }

    };



    return (

        <div className='min-h-screen bg-gray-100 p-5'>

            <div className='max-w-5xl mx-auto grid md:grid-cols-2 gap-8'>

      

                <div className='bg-white p-6 rounded-xl shadow-md'>

                    <h2 className='text-2xl font-bold mb-6'>
                        Shipping Information
                    </h2>

                    <form onSubmit={handleOrder} className='space-y-5'>

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            required
                            className='input input-bordered w-full'
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            required
                            className='input input-bordered w-full'
                        />

                        <textarea
                            name="address"
                            placeholder="Full Address"
                            required
                            className='textarea textarea-bordered w-full'
                        ></textarea>



                     

                        <div className='space-y-3'>

                            <label className='flex items-center gap-2'>

                                <input
                                    type="radio"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                Cash On Delivery

                            </label>



                            <label className='flex items-center gap-2'>

                                <input
                                    type="radio"
                                    value="online"
                                    checked={paymentMethod === 'online'}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                Online Payment

                            </label>

                        </div>



                        <button
                            type='submit'
                            className='btn btn-primary w-full'
                        >
                            {
                                paymentMethod === 'cod'
                                    ? 'Place Order'
                                    : 'Proceed To Payment'
                            }
                        </button>

                    </form>

                </div>


    

                <div className='bg-white p-6 rounded-xl shadow-md h-fit'>

                    <h2 className='text-2xl font-bold mb-6'>
                        Order Summary
                    </h2>

                    <div className='space-y-4'>

                        {
                            cart.map(item => (

                                <div
                                    key={item._id}
                                    className='flex justify-between border-b pb-3'
                                >

                                    <p>{item.title}</p>

                                    <p>৳ {item.price}</p>

                                </div>

                            ))
                        }

                    </div>



                    <div className='flex justify-between mt-6 text-xl font-bold'>

                        <span>Total</span>

                        <span>৳ {totalPrice.toFixed(2)}</span>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default CheckOut;