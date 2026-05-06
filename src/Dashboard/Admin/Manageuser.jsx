import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Manageuser = () => { 

const[users,setUsers]=useState([]) 

useEffect(()=>{
axios.get(`http://localhost:3000/user`).then(res=>setUsers(res.data)) 
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
          <button
                onClick={() => handleSuspend(user._id, user.status)}
                className={`btn btn-xs p-2 ${
                user.status === 'suspended' ? 'btn-success' : 'btn-warning'}`}      >
  
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