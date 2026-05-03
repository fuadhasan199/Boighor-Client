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
        path:'categories',
        element:<Categories></Categories>
       } ,
       {
        path:'viewDetails/:id',
        element: <Private> <ViewDetails></ViewDetails> </Private>
       
       },
       {
        path:'SignUp',
        element:<SignUp></SignUp>
       },
       {
        path:'SignIn',
        element:<SignIn></SignIn>
       },
       {
        path:'dashboard',
        element:<Private> <Dashboard></Dashboard>   </Private>
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
