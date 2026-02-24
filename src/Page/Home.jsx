import React, { useEffect, useState } from 'react';
import Banar from '../Extra-Component/Banar';
import Swip from '../Extra-Component/Swip';
import axios from 'axios';
import { GrLinkNext } from 'react-icons/gr';
import { Link } from 'react-router';

const Home = () => {  
    const [books,setBooks]=useState([])
    useEffect(()=>{
   axios.get(`http://localhost:3000/books`)
   .then(res=>setBooks(res.data))
    },[])

    return (
        <div className='container mx-auto p-2 rounded-md bg-base-100 mb-12'> 
        
        <Banar></Banar> 
     <div className="mt-10"> 
    
      <h1 className='text-3xl font-bold text-gray-800 text-center mb-2'>নতুন আসা বইসমূহ</h1> 
      <p className='text-lg text-blue-600 font-medium text-center mb-8'>বইয়ের দুনিয়ায় নতুন কী আসলো? এক পলকে দেখে নিন আমাদের লেটেস্ট কালেকশন।</p> 

         <div className=" mt-5 mb-5 ml-5 text-xl font-bold">বইয়ের সংখ্যা  ঃ ৬ টি</div>
     <div className="grid grid-cols-1 p-2 gap-5 md:grid-cols-3"> 

      {books.slice(3,9).map((book) => (
    <div 
      key={book.id} 
      className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 flex flex-col h-full"
    >
    
      <div className="relative overflow-hidden rounded-t-2xl bg-slate-100 dark:bg-slate-800">
        <img 
          src={book.image} 
          alt={book.title} 
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        />
       
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-800 dark:text-slate-200 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
            {book.category}
          </span>
        </div>
      </div>

     
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white line-clamp-1 mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {book.author}
        </p>

      
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ৳{book.discountPrice}
          </span>
          {book.discountPrice < book.price && (
            <span className="text-sm text-red-500 line-through decoration-red-600 font-medium">
              ৳{book.price}
            </span>
          )}
        </div>

       
        <div className="flex flex-col gap-2 mt-auto">
          <button 
            disabled={book.stock === 0}
            className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold py-2.5 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {book.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          
          <Link to={`viewDetails/${book._id}`}> 
                 <button className="w-full bg-transparent border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 text-sm">
            View Details
          </button>
          
          
          
          </Link> 

   
        </div>
      </div>
    </div>
  ))}

     </div>
      
     </div>
               
     <Link to="/categories" className="btn btn-primary w-max flex justify-center items-center mx-auto p-3 mt-10 mb-10">Explore More Books <GrLinkNext className='text-xl mt-1' />  </Link>
  
        <div className=" mt-10">
            <h1 className='font-bold text-3xl text-center divider'> Customer review</h1> 

             <Swip></Swip>
        </div>  

          {/* How to buy */} 


        <div className="mt-20 bg-slate-50 dark:bg-slate-800 p-10 rounded-2xl">
    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">কিভাবে বই অর্ডার করবেন?</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">১</div>
            <h3 className="font-bold mb-2 text-base-200">বই পছন্দ করুন</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">আমাদের  সংগ্রহ থেকে আপনার পছন্দের বইটি বেছে নিন।</p>
        </div>
        <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">২</div>
            <h3 className="font-bold mb-2 text-base-200">বিস্তারিত দেখুন</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">"View Details" বাটনে ক্লিক করে বইটির সারসংক্ষেপ ও দাম দেখে নিন।</p>
        </div>
        <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">৩</div>
            <h3 className="font-bold mb-2  text-base-200">অর্ডার করুন</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">ডান পাশে নিচে থাকা "Buy Now" বাটনে ক্লিক করে আপনার তথ্য দিন।</p>
        </div>
        <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">৪</div>
            <h3 className="font-bold mb-2 text-base-200">বই বুঝে নিন</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">খুব দ্রুততম সময়ে আমরা আপনার ঠিকানায় বই পৌঁছে দেব।</p>
        </div>
    </div>
</div> 


<div className="mt-20 bg-blue-600 rounded-2xl p-8 text-center text-white">
    <h2 className="text-2xl font-bold mb-4">কোন সমস্যা হলে জানান</h2>
    <p className="mb-6">আপনার সমস্যার বিস্তারিত নিচের বক্সে লিখুন</p>
    <div className="flex max-w-md mx-auto gap-2">
        <input type="text" placeholder="আপনার সমস্যা..." className="input input-bordered w-full text-gray-800" />
        <button className="btn btn-neutral">পাঠান</button>
    </div>
</div>
      
    

          
        </div>
    );
};

export default Home;