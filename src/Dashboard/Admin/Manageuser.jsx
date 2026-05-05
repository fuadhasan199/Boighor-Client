import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Manageuser = () => { 

const[users,setUsers]=useState([]) 

useEffect(()=>{
axios.get(`http://localhost:3000/user`).then(res=>setUsers(res.data)) 
.catch(error=>console.log(error.message))

},[])

    return (
        <div className='bg-gray-200 p-2 rounded-md'> 
        <span className='font-bold text-xl text-green-700'>Total Users:{users.length}</span>
           <div className="overflow-x-auto">
  <table className="table">
   
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody> 


    {users.map((user, index) => (
      <tr key={user._id}>
        <th>{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
            <button className='btn btn-warning p-2 rounded-md'>Suspend</button>
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