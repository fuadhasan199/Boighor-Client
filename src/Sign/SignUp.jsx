import { createUserWithEmailAndPassword,  updateProfile } from 'firebase/auth';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link,  useNavigate } from 'react-router';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const SignUp = () => {  
  const {signInWithGoogle}=useContext(AuthContext) 
 

  const navigate=useNavigate()

const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm() 

  const onSubmit=async(data)=>{ 
      
    try{ 

         const result=await createUserWithEmailAndPassword(auth,data.email,data.password) 

          await updateProfile(auth.currentUser,{displayName:data.name}) 


          const userInfo={
              name:data.name,
              email:data.email,
              mobile:data.mobile,
              role:data.userType
          } 

          const response=await axios.post(`http://localhost:3000/user`,userInfo) 

          if(response.data.insertedId){
              reset() 
              Swal.fire({
                  icon: 'success',
                title: 'Registration Successful!',
                text: 'Your Account Created Successfully',
              }) 
              navigate('/')
               
          } 
       
    } 
    catch(error){ 
      Swal.fire({
            icon: 'error',
                title: 'Registration Failed',
                text:error.message,
      })
    } 
   


      
  } 

       const handleGoogleSignIn=async()=>{
       
       try{
           const result=await signInWithGoogle()
           const user=result.user  

           const userInfo={
              name:user.displayName,
              email:user.email,
              mobile:user.phoneNumber,
              role:'user',
              status:'active'
           } 
           const response=await axios.post(`http://localhost:3000/user`,userInfo)
           if(response.data.insertedId){
             Swal.fire('Success', 'Registration Successful via Google', 'success')
             navigate('/')
           } 
       } 
       catch(error){
        Swal.fire('Error',error.message,"error")
       }




     }

    return (
           <div className="min-h-screen flex items-center justify-center `bg-gradient-to-r from-green-100 to-emerald-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Full Name" {...register('name',{required:true})}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="text" {...register('mobile',{required:true})}
            placeholder="Mobile Number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"{...register('email',{required:true})}
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password" {...register('password',{required:true},{minlength:6},{ pattern: /^[A-Za-z]+$/i })}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          /> {errors.password &&  <p className='text-red-600 text-sm mt-1'>{errors.password.message}</p>}

          <select {...register('userType')}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            defaultValue="user"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button 
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <button onClick={handleGoogleSignIn}
          type="button" 
          className="w-full mt-4 border p-4 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
           <FcGoogle className='inline-block  text-2xl' /> Sign up with Google
        </button>

        <p className="text-center mt-5 text-sm">
          Already have an account?{" "}
          <Link to="/SignIn" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
    );
};

export default SignUp;