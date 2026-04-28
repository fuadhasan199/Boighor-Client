import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router';

const Private = ({children}) => { 
    const {user,loading}=useContext(AuthContext) 
    // const navigate=useNavigate() 

  if(loading){
      return <span className="loading loading-spinner loading-lg"></span>
  } 
  if(user){
    return children
  } 
    return <Navigate to={'/SignIn'} replace></Navigate>


   
    
};

export default Private;