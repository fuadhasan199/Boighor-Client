import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Manageuser = () => { 

const[users,setUsers]=useState([]) 
const [loading,setloading]=useState(true)

useEffect(()=>{
axios.get(`http://localhost:3000/user`).then(res=>{
  setUsers(res.data) 
  setloading(false)
})
 .catch(error=>console.log(error.message)) 

},[]) 


 const handleSuspend=(id,currentStatus)=>{ 
    const newStatus=currentStatus==='active'?'suspended':"active" 
    axios.patch(`http://localhost:3000/user/${id}`,{status:newStatus})
    .then(()=>{
         setUsers(prev=>
           prev.map(user=>
               user._id===id?{...user,status:newStatus}:user
           )
         ) 
       
    })
 } 

 if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
    <span className="loading loading-dots loading-lg"></span>
     <span className="loading loading-dots loading-xl"></span>
    </div>
  );
}

    return (
        <div className='bg-gray-200 p-2 md:p-6 rounded-md min-h-screen'> 
            {/* Header section responsive font size */}
            <div className='mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
                <span className='font-bold text-lg md:text-2xl text-green-700'>
                    Total Users: {users.length}
                </span>
            </div>

            {/* overflow-x-auto handles horizontal scroll on small devices */}
            <div className="overflow-x-auto w-full bg-white rounded-lg shadow-sm">
                <table className="table table-compact md:table-normal w-full">
                    {/* Table Head */}
                    <thead className="bg-gray-300 text-gray-800">
                        <tr className="text-xs md:text-sm">
                            <th>#</th>
                            <th>Name</th>
                            {/* Email hidden on extra small and shown on small+ screens */}
                            <th className="hidden sm:table-cell">Email</th> 
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50 border-b border-gray-100">
                                <th className="text-xs md:text-sm">{index + 1}</th>
                                <td className="text-xs md:text-sm font-medium">
                                    <div className="max-w-[100px] md:max-w-none truncate md:whitespace-normal">
                                        {user.name}
                                    </div>
                                    {/* Mobile only Email view (Name এর নিচে ছোট করে ইমেইল দেখাবে শুধু মোবাইলে) */}
                                    <div className="sm:hidden text-[10px] opacity-60 truncate max-w-[120px]">
                                        {user.email}
                                    </div>
                                </td>
                                <td className="hidden sm:table-cell text-xs md:text-sm">{user.email}</td>
                                <td>
                                    <button
                                        onClick={() => handleSuspend(user._id, user.status)}
                                        className={`btn btn-xs md:btn-sm px-2 md:px-4 normal-case ${
                                        user.status === 'suspended' ? 'btn-success' : 'btn-warning'}`}
                                    >
                                        {user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Manageuser;