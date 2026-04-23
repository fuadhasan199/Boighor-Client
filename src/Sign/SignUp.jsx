import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';

const SignUp = () => {
    return (
           <div className="min-h-screen flex items-center justify-center `bg-gradient-to-r from-green-100 to-emerald-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            defaultValue="user"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="button"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <button
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