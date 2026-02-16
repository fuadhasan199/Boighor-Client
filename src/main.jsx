import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' 
import { createBrowserRouter, RouterProvider } from 'react-router';
import Mainlayout from './Layout/Mainlayout.jsx';
import Home from './Page/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>, 
    children:[ 
       { 
      index:true ,
       element:<Home></Home>
         
       }
    
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}> </RouterProvider>
  </StrictMode>,
)
