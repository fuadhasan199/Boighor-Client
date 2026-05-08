import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import AdminHome from './Admin/AdminHome';
import UserHome from './User/UserHome';


const DashboardHome = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => { 
       
        if (user?.email) {
            axios.get(`http://localhost:3000/users/admin/${user.email}`)
                .then(res => {
                    setIsAdmin(res.data.admin)
                    setRoleLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching admin status:", err);
                    setRoleLoading(false);
                });
        } else if (!authLoading && !user) {
            setRoleLoading(false)
        }
    }, [user, authLoading]);

    if (authLoading || roleLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <span className="loading loading-spinner loading-lg text-green-600"></span>
            </div>
        );
    }

    return (
        <div>
            
            {isAdmin ? <AdminHome /> : <UserHome />}
        </div>
    );
};

export default DashboardHome;