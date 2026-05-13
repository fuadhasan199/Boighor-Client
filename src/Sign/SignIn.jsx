import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const SignIn = () => { 
const {SignIn,signInWithGoogle}=useContext(AuthContext) 
const navigate=useNavigate() 

const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm() 
  
const onSubmit = async (data) => {
    try {
        const result = await SignIn(data.email, data.password);
      
        const token = await result.user.getIdToken();

       
        const res = await axios.get(`http://localhost:3000/user?email=${data.email}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        const dbUser = res.data.find(user => user.email === data.email)

        if (dbUser?.status === 'suspended') {
            await Swal.fire('Blocked', 'Your account is suspended', 'error');
            return;
        }

        reset();
        Swal.fire('Success', "Login Successful", "success")
        navigate("/");
    } catch (error) {
        Swal.fire('Error', error.message, "error")
    }
}

  const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithGoogle();
    const user = result.user;
    const token = await user.getIdToken()

    
    const res = await axios.get(`http://localhost:3000/user`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

   
    const dbUser = res.data.find(u => u.email === user.email);

    if (dbUser?.status === 'suspended') {
      await Swal.fire('Blocked', 'Your account is suspended', 'error');
      return
    }

   
    const userInfo = {
      name: user.displayName,
      email: user.email,
      mobile: user.phoneNumber || 'N/A',
      role: 'user'
    };

    
    await axios.post(`http://localhost:3000/user`, userInfo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    Swal.fire({
      icon: 'success',
      title: 'Google Login Successful!',
    });
    navigate('/');
  } catch (error) {
    console.error(error);
    Swal.fire('Error', error.message, "error");
  }
}

 

    return (
        <div className="min-h-screen flex items-center justify-center `bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
           Welcome back! Please log in to continue
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}> 
          <input
            type="email" {...register('email',{required:true})}
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password" {...register('password',{required:true})}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <button  onClick={handleGoogleSignIn}
          type="button"
          className="w-full mt-4 font-semibold border p-3 rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle className='inline-block text-xl' /> Sign in with Google
        </button>

        <p className="text-center mt-5 text-sm">
          Don’t have an account?{" "}
          <Link to="/SignUp" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
    );
};

export default SignIn;