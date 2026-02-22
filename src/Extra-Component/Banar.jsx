import React from 'react';
import { GrLinkNext } from 'react-icons/gr';
import { Link } from 'react-router';

const Banar = () => {
    return (
        <div>
            <div
  className="hero p-44 rounded-xl"
  style={{
    backgroundImage:
      "url('https://i.ibb.co.com/5V3Syp2/banar.jpg')",
  }}
>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Step Into a World of Words</h1>
      <p className="mb-5">
       Boighor: Your Cozy Corner for Bangla Literature, from Classics to Bestsellers.
      </p>
       <Link to={'/categories'} className='btn btn-primary p-2 '> Explore More <GrLinkNext className='mt-1 '  /> </Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default Banar;