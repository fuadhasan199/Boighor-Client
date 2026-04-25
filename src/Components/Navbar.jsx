import React from 'react';
import logo from '../assets/logo.jpg'
import { NavLink } from 'react-router';
import { Link } from 'react-router';
const Navbar = () => { 
    return (
        <div>
            <div className="container mx-auto p-2 rounded-xl navbar bg-base-300 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li> 
          <NavLink to="/" className={({isActive})=>isActive ? "text-green-700 font-bold":""}> Home</NavLink>
           </li>
        <li> 
        <NavLink to="/categories" className={({isActive})=>isActive ? "text-green-700 font-bold":""}> Categories</NavLink> 
        
        </li>
        <li><NavLink to="/dashboard" className={({isActive})=>isActive ? "text-green-700 font-bold":""}> Dashboard</NavLink> </li>
      </ul>
    </div>
    <img src={logo} alt="" className='w-20 rounded-2xl h-17'  />
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li> <NavLink to="/" className={({isActive})=>isActive ? "text-green-700 font-bold":""}> Home</NavLink> </li>
       <li> <NavLink to="/categories" className={({isActive})=>isActive ? "text-green-700 font-bold":""}> Categories</NavLink> </li>
       <li> <NavLink to="/dashboard" className={({isActive})=>isActive ? "text-green-700 font-bold":""}> Dashboard</NavLink> </li>
     
    </ul>
  </div>
  <div className="navbar-end">
    <Link to='/SignIn'> <button className={"btn btn-primary px-2 rounded-md"}> LogIn </button> </Link>
  </div>
</div>
        </div>
    );
};

export default Navbar;