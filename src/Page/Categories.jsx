import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Categories = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [activeCategory, setActiveCategory] = useState("সব");

    useEffect(() => {
        
        axios.get(`http://localhost:3000/books`)
            .then(res => {
                setBooks(res.data);
                setFilteredBooks(res.data);
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
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <div key={book._id} className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
                                    <figure className='px-4 pt-4'>
                                        <img src={book.image} alt={book.title} className="rounded-xl h-64 w-full object-cover" />
                                    </figure>
                                    <div className="card-body p-5">
                                        <div className="badge badge-secondary badge-outline">{book.category}</div>
                                        <h2 className="card-title text-lg">{book.title}</h2>
                                        <p className='text-sm text-gray-500'>লেখক: {book.author}</p>
                                        
                                        <div className='flex items-center gap-2 mt-2'>
                                            <span className='text-xl font-bold text-success'>৳{book.discountPrice}</span>
                                            <span className='text-sm line-through text-gray-400'>৳{book.price}</span>
                                        </div>

                                        <p className='text-xs mt-2 line-clamp-2'>{book.shortDescription}</p>
                                        
                                        <div className="card-actions justify-end mt-4">
                                            <button className="btn btn-sm btn-outline btn-success w-full">View Details</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='col-span-full text-center py-20'>
                                <p className='text-xl text-gray-400'>এই ক্যাটাগরিতে কোনো বই পাওয়া যায়নি।</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Categories;