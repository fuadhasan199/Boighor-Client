import { useEffect, useContext, useRef } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';
import { CartContext } from '../Provider/CartProvider';
import { useNavigate, useSearchParams } from 'react-router';
import { IoMdArrowBack } from 'react-icons/io';


const Success = () => {
  const [searchParams] = useSearchParams();
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const isRequestSent = useRef(false); 

  useEffect(() => {
    const session_id = searchParams.get('session_id');

   
    if (session_id && !isRequestSent.current) {
      isRequestSent.current = true; 

      axios.get(`http://localhost:3000/verify-payment?session_id=${session_id}`)
        .then(res => {
          if (res.data.success) {
            setCart([]);
            Swal.fire({
              icon: 'success',
              title: 'Payment Successful!',
              text: 'Your order has been placed.'
            }).then(() => navigate('/'));
          }
        })
        .catch(err => {
            console.error(err);
            isRequestSent.current = false; 
        });
    }
  }, [searchParams, navigate, setCart]);

  return ( 
    <div className='p-5 bg-gray-200 rounded-md text-2xl'>
  
<h2 className="text-2xl font-semibold mb-2">
  Processing your order...
</h2>

<p className="text-gray-600">
  Your payment has been completed successfully. Please wait while we prepare and deliver your product.
</p>  

   <button className="btn btn-primary mt-12 flex items-center mx-auto " onClick={() => navigate('/dashboard')}>
    <IoMdArrowBack size={20}/>  Back To Dashboard
   </button>
</div>

  );
};

export default Success;