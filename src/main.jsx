import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' 
import { createBrowserRouter, RouterProvider } from 'react-router';
import Mainlayout from './Layout/Mainlayout.jsx';
import Home from './Page/Home.jsx';
import Categories from './Page/Categories.jsx';
import Dashboard from './Page/Dashboard.jsx';
import ViewDetails from './Extra-Component/ViewDetails.jsx';
import SignUp from './Sign/SignUp.jsx';
import SignIn from './Sign/SignIn.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';

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
        element:<ViewDetails></ViewDetails>
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
        element:<Dashboard></Dashboard>
       }
    
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <AuthProvider>
       <RouterProvider router={router}> </RouterProvider>
    </AuthProvider>
   
  </StrictMode>,
)
