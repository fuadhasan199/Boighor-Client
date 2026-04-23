import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Categories = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [activeCategory, setActiveCategory] = useState("সব");

    useEffect(() => {
        
        axios.get(`http://localhost:3000/books`)
            .then(res => {
                setBooks(res.data);
                setFilteredBooks(res.data)
            });
    }, []);

 
    const categories = [
        { name: 'সব', value: 'all' },
        { name: 'উপন্যাস', value: 'Novel' },
        { name: 'থ্রিলার', value: 'Thriller' },
        { name: 'ইসলামিক', value: 'Islamic' },
        { name: 'কবিতা', value: 'Poetry' },
        { name: 'বিজ্ঞান কল্পকাহিনি', value: 'Sci-Fi' },
        { name: 'সেলফ-হেল্প', value: 'Self-Help' },
        { name: 'ইতিহাস', value: 'History' }
    ];

    
    const handleFilter = (catName, catValue) => {
        setActiveCategory(catName);
        if (catValue === 'all') {
            setFilteredBooks(books);
        } else {
            const filtered = books.filter(book => book.category === catValue);
            setFilteredBooks(filtered);
        }
    };

    return (
        <div className='container mx-auto p-4 rounded-md bg-base-100'>
            <h1 className='text-3xl font-bold text-center mb-5 mt-5'>আমাদের সকল বইয়ের সংগ্রহ</h1>
            <p className='text-center mb-10 text-gray-600'>আপনার পছন্দের লেখকের বই খুঁজে নিন সহজেই।</p>

            <div className="flex flex-col md:flex-row gap-8">
               
                <aside className='w-full md:w-1/4'>
                    <div className="bg-base-200 p-5 rounded-2xl sticky top-5">
                        <h1 className='font-bold mb-4 text-success text-xl border-b pb-2'>বইয়ের ক্যাটাগরি</h1>
                        <ul className='menu w-full p-0 gap-2'>
                            {categories.map((cat, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleFilter(cat.name, cat.value)}
                                        className={`btn btn-ghost justify-start hover:bg-success hover:text-white ${activeCategory === cat.name ? "bg-success text-white" : ""}`}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

               
             <main className='flex-1'>
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {filteredBooks.length > 0 ? (
      filteredBooks.map((book) => (
        <div
          key={book._id}
          className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 flex flex-col h-full"
        >
          {/* Image & Category Tag */}
          <div className="relative overflow-hidden rounded-t-2xl bg-slate-100 dark:bg-slate-800">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-800 dark:text-slate-200 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                {book.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white line-clamp-1 mb-1">
              {book.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {book.author}
            </p>

            {/* Price */}
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

            {/* Buttons */}
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

              <Link to={`/viewDetails/${book._id}`}>
                <button className="w-full bg-transparent border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 text-sm">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-full text-center py-20 text-gray-500">
        এই ক্যাটাগরিতে কোনো বই পাওয়া যায়নি।
      </div>
    )}
  </div>
</main>
            </div>
        </div>
    );
};

export default Categories;