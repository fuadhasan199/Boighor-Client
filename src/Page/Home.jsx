import React, { useContext, useEffect, useState } from 'react';
import Banar from '../Extra-Component/Banar';
import Swip from '../Extra-Component/Swip';
import axios from 'axios';
import { GrLinkNext } from 'react-icons/gr';
import { Link } from 'react-router';
import { CartContext } from '../Provider/CartProvider';
import { AuthContext } from '../Provider/AuthProvider';

const Home = () => {

  const { cart, addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then(res => setBooks(res.data));
  }, []);

  return (
    <div className='container mx-auto p-2 rounded-md bg-base-100 mb-12'>

      <Banar />

      <div className="mt-10">
        <h1 className='text-3xl font-bold text-center mb-2'>নতুন আসা বইসমূহ</h1>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {books.slice(3, 9).map((book) => {

            const isAdded = cart.some(item => item.productId === book._id);

            return (
              <div key={book._id} className="bg-white rounded-xl shadow p-4">

                <img src={book.image} className="h-60 w-full object-cover" />

                <h2 className="text-lg font-bold mt-2">{book.title}</h2>
                <p>{book.author}</p>

                <p className="text-blue-600 font-bold">৳{book.price}</p>

               
      {user && ( 
  <button
    onClick={() => addToCart(book)} 
    disabled={isAdded || book.stock === 0}
    className={`w-full mt-3 py-2 rounded 
      ${isAdded ? 'bg-gray-400' : 'bg-blue-600 text-white'}`}
  >
    {book.stock === 0
      ? "Out of Stock"
      : isAdded
        ? "Added"
        : "Add to Cart"}
  </button>
)}

               
  <Link to={`viewDetails/${book._id}`}>
  <button className="w-full mt-2 border py-2 rounded">
                    View Details
                  </button>
                </Link>

              </div>
            );
          })}

        </div>
      </div> 

      <Link to="/categories" className="btn btn-primary mt-10 mx-auto flex w-max">
        Explore More Books <GrLinkNext />
      </Link>

      <Swip /> 

      <div className="p-8 bg-white">
  <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
  How to Buy a Book
   </h2>
  

  <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6">
   
    <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg w-full md:w-64 border border-blue-100">
      <span className="text-blue-600 font-bold text-lg mb-2">Step 1</span>
      <h3 className="font-semibold text-gray-800">লগ ইন করুন</h3>
      <p className="text-sm text-gray-600 text-center">প্রথমে আপনার একাউন্ট লগ ইন করুন</p>
    </div>


    <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg w-full md:w-64 border border-green-100">
      <span className="text-green-600 font-bold text-lg mb-2">Step 2</span>
      <h3 className="font-semibold text-gray-800">এড টু  কার্ট</h3>
      <p className="text-sm text-gray-600 text-center">বই এর কার্ট বাটন টা এ ক্লিক করুন</p>
    </div>

    
    <div className="flex flex-col items-center p-6 bg-purple-50 rounded-lg w-full md:w-64 border border-purple-100">
      <span className="text-purple-600 font-bold text-lg mb-2">Step 3</span>
      <h3 className="font-semibold text-gray-800"> মাই কার্ট এ যান</h3>
      <p className="text-sm text-gray-600 text-center">ড্যাশবোর্ড এর মাই কার্ট এ যান</p>
    </div>

  
    <div className="flex flex-col items-center p-6 bg-red-50 rounded-lg w-full md:w-64 border border-red-100">
      <span className="text-red-600 font-bold text-lg mb-2">Step 4</span>
      <h3 className="font-semibold text-gray-800">এড্রেস ও পেমেন্ট</h3>
      <p className="text-sm text-gray-600 text-center">এড্রেস ফরম পূরণ করুণ আর পেমেন্ট করুন
        
      </p>
    </div>

  </div>
</div>

    </div>
  );
};

export default Home;