import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Categories from '../Page/Categories';
import { IoArrowBackSharp } from 'react-icons/io5';

const ViewDetails = () => {  
    const [books,setBooks]=useState([]) 
    const {id}=useParams() 
    const [loading,setLoading]=useState(true) 
    const navigate=useNavigate()

 useEffect(() => {
 
  axios.get(`http://localhost:3000/books/${id}`)
  .then(res=>{  
     setBooks(res.data) 
      setLoading(false)

  })  
  .catch(error=>{
    console.log(error.message) 
      setLoading(false)
     
  } ) 

 

 },[id]) 
  
 if(loading){
     return <div className=" flex justify-center items-center h-screen"> 
     <span className="loading loading-infinity loading-xl"></span>

     </div> 
 } 
 if(!books){
      return <div className="flex justify-center ">কোন বই পাওয়া যাই নি</div>
 }

    return (
        <div className='container mx-auto p-2 rounded-md min-h-screen bg-base-100'> 
        <h1 className='text-2xl font-bold text-center my-4'>বইয়ের বিস্তারিত তথ্য    </h1>
        <button className='btn text-xl p-5 bg-base-300 ' onClick={()=>navigate(-1)}><IoArrowBackSharp />
             </button>
        <div className="card lg:card-side bg-base-100 shadow-md mt-12">
  <figure>
    <img
      src={books.image}
      alt="Album" className='w-65 h-80 object-cover p-1 rounded-xl'  />
  </figure>
  <div className="card-body">
    <h2 className="card-title">বইয়ের নাম : {books.title}  ({books.category}) </h2> 
    <h2 className="card-title"> লেখক :       {books.author}</h2> 
    <p>{books.description}</p> 
    
   <div className="mt-4 card-dash">

        <p className='text-xl text-red-500 line-through '>দাম : {books.price} টাকা</p> 
         <p className='text-2xl font-bold mt-2 text-green-600'>ডিস্কাউন্ট : {books.discountPrice} টাকা
        </p> 
        <p className='text-xl font-semibold mt-2 text-blue-500'>স্টক : {books.stock} টি

            
        </p>
   </div>
     
        
    <div className="card-actions justify-end ">
      <button className="btn btn-primary">Buy Now </button>
    </div>
  </div>
</div>
     
            
        </div>
    );
};

export default ViewDetails;