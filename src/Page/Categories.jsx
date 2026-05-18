import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { CartContext } from '../Provider/CartProvider';
import { AuthContext } from '../Provider/AuthProvider';

const Categories = () => {

    const { cart, addToCart } = useContext(CartContext)
    const { user } = useContext(AuthContext)

    const [books, setBooks] = useState([]) 
    const [loading,setLoading]=useState(true)
    const [filteredBooks, setFilteredBooks] = useState([])
    const [activeCategory, setActiveCategory] = useState("সব")

    useEffect(() => {
        axios.get(`https://boighorserver.vercel.app/books`)
            .then(res => {
                setBooks(res.data)
                setFilteredBooks(res.data)
                setLoading(false) 
            })
    }, [])

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
 if(loading){
       return(
        <div className="flex justify-center items-center min-h-screen">
         
         <span className="loading loading-dots loading-xl"></span>
            <span className="loading loading-dots loading-xl"></span>
        </div>
       )
 }
    const handleFilter = (catName, catValue) => {
        setActiveCategory(catName)
        if (catValue === 'all') {
            setFilteredBooks(books)
        } else {
            const filtered = books.filter(book => book.category === catValue)
            setFilteredBooks(filtered)
        }
    };

    return (
        <div className='container mx-auto p-4 rounded-md bg-base-100 mb-12'>

            <h1 className='text-3xl font-bold text-center mb-5 mt-5'>আমাদের সকল বইয়ের সংগ্রহ</h1>

            <div className="flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <aside className='w-full md:w-1/4'>
                    <div className="bg-base-200 p-5 rounded-2xl sticky top-5">
                        <h1 className='font-bold mb-4 text-success text-xl border-b pb-2'>বইয়ের ক্যাটাগরি</h1>

                        <ul className='menu w-full p-0 gap-2'>
                            {categories.map((cat, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handleFilter(cat.name, cat.value)}
                                        className={`btn btn-ghost w-full justify-start 
                                        ${activeCategory === cat.name ? "bg-success text-white" : ""}`}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Products */}
                <main className='flex-1'>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {filteredBooks.map((book) => {

                            const isAdded = cart.some(item => item.productId === book._id);

                            return (
                                <div key={book._id} className="bg-white rounded-xl shadow p-4 flex flex-col">

                                    <img src={book.image} className="h-60 w-full object-cover rounded" />

                                    <h2 className="text-lg font-bold mt-2">{book.title}</h2>
                                    <p className="text-sm">{book.author}</p>

                                    <p className="text-blue-600 font-bold mt-2">
                                        ৳{book.discountPrice || book.price}
                                    </p>

                                    {/* ADD TO CART */}
                                    {user && (
                                        <button
                                            onClick={() => addToCart(book)}
                                            disabled={isAdded || book.stock === 0}
                                            className={`mt-3 py-2 rounded 
                                            ${isAdded ? 'bg-gray-400' : 'bg-blue-600 text-white'}`}
                                        >
                                            {book.stock === 0
                                                ? 'Out of Stock'
                                                : isAdded
                                                    ? 'Added'
                                                    : 'Add to Cart'}
                                        </button>
                                    )}

                                    {/* VIEW DETAILS */}
                                    <Link to={`/viewDetails/${book._id}`}>
                                        <button className="w-full mt-2 border py-2 rounded">
                                            View Details
                                        </button>
                                    </Link>

                                </div>
                            )
                        })}

                    </div>
                </main>

            </div>
        </div>
    );
};

export default Categories;