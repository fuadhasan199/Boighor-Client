import React from 'react';
import Banar from '../Extra-Component/Banar';
import Swip from '../Extra-Component/Swip';

const Home = () => {
    return (
        <div className='container mx-auto p-2 rounded-md bg-base-100 mb-12'> 
        
        <Banar></Banar> 

        <div className=" mt-10">
            <h1 className='font-bold text-3xl text-center divider'> Customer review</h1> 

             <Swip></Swip>
        </div>

          
        </div>
    );
};

export default Home;