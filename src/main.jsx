import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' 
import { createBrowserRouter, RouterProvider } from 'react-router';
import Mainlayout from './Layout/Mainlayout.jsx';
import Home from './Page/Home.jsx';
import Categories from './Page/Categories.jsx';

import ViewDetails from './Extra-Component/ViewDetails.jsx';
import SignUp from './Sign/SignUp.jsx';
import SignIn from './Sign/SignIn.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Private from './Provider/Private.jsx';
import CartProvider from './Provider/CartProvider.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Profile from './Dashboard/Profile.jsx';
import MyCart from './Dashboard/User/MyCart.jsx';
import Mypurchase from './Dashboard/User/Mypurchase.jsx';
import ManageBook from './Dashboard/Admin/ManageBook.jsx';
import Manageuser from './Dashboard/Admin/Manageuser.jsx';
import AddBook from './Dashboard/Admin/AddBook.jsx';
import AdminHome from './Dashboard/Admin/AdminHome.jsx';
import UserHome from './Dashboard/User/UserHome.jsx';
import DashboardHome from './Dashboard/DashboardHome.jsx';
import CheckOut from './Dashboard/CheckOut.jsx';
import Success from './Dashboard/Success.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>, 
    children:[ 
       { 
      index:true ,
       element:<Home></Home>
         
       } ,
       {
        path:'/categories',
        element:<Categories></Categories>
       } ,
       {
        path:'/viewDetails/:id',
        element: <Private> <ViewDetails></ViewDetails> </Private>
       
       },
       {
        path:'/SignUp',
        element:<SignUp></SignUp>
       },
       {
        path:'/SignIn',
        element:<SignIn></SignIn>
       },
       {
        path:'dashboard',
        element:<Private> <Dashboard></Dashboard>   </Private> ,
         children:[ 
           {
             index:true,
             element:<DashboardHome></DashboardHome>
           },
           {
             path:'userHome',
             element:<UserHome></UserHome>
           },
           {
             path:'adminHome',
             element:<AdminHome></AdminHome>
           },
           { 
             path:"profile",
             element:<Profile></Profile>
           }, 
         
             {
               path:'MyCart',
               element:<MyCart></MyCart>
             },
             {
              path:'MyPurchase',
              element:<Mypurchase></Mypurchase>
             } ,
           
            {
               path:'ManageBook',
               element:<ManageBook></ManageBook>
            },
            {
              path:"ManageUser",
              element:<Manageuser></Manageuser>
            },
            {
              path:"AddBook",
              element:<AddBook></AddBook>
            },
            {
              path:"CheckOut",
              element:<CheckOut></CheckOut>
            },{
              path:"Success",
              element:<Success></Success>
            }
         ]
       }
    
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>  
     
 <AuthProvider> 
  <CartProvider> 
 <RouterProvider router={router}> </RouterProvider>
  </CartProvider>
      
    </AuthProvider> 

   
   
  </StrictMode>,
)
