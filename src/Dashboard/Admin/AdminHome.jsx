import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBook, FaUsers, FaShoppingCart } from 'react-icons/fa';

const AdminHome = () => {
    const [stats, setStats] = useState({ books: 0, users: 0 });

    useEffect(() => {
    
        axios.get('http://localhost:3000/books').then(res => setStats(prev => ({...prev, books: res.data.length})));
        axios.get('http://localhost:3000/user').then(res => setStats(prev => ({...prev, users: res.data.length})));
    }, []);

    return (
        <div className="p-6 bg-gray-200 rounded-md min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back, Admin!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Card 1 */}
                <div className="stat bg-white shadow rounded-lg p-6 flex items-center gap-4">
                    <div className="p-4 bg-green-100 text-green-600 rounded-full"><FaBook size={30} /></div>
                    <div>
                        <div className="stat-title text-gray-500">Total Books</div>
                        <div className="stat-value text-2xl font-bold">{stats.books}</div>
                    </div>
                </div>

                {/* Stats Card 2 */}
                <div className="stat bg-white shadow rounded-lg p-6 flex items-center gap-4">
                    <div className="p-4 bg-blue-100 text-blue-600 rounded-full"><FaUsers size={30} /></div>
                    <div>
                        <div className="stat-title text-gray-500">Total Users</div>
                        <div className="stat-value text-2xl font-bold">{stats.users}</div>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default AdminHome;