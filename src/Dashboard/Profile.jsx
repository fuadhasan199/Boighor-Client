import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Profile = () => { 
    const {user}=useContext(AuthContext)
    return ( 
        
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center p-6"> 
    
      <div className="w-full max-w-4xl bg-white shadow-2xl  rounded-2xl overflow-hidden">

        {/* Cover Section */}
        <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
      
        {/* Profile Info */}
        <div className="relative px-6 pb-6">

          {/* Profile Image */}
          <div className="absolute -top-36 left-6">
            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          {/* Info Section */}
          <div className="mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user?.displayName || "No Name Found"}
              </h2>
              <p className="text-gray-500">
                {user?.email || "No Email Available"}
              </p>
            </div>

            <div className="flex gap-3">
              
             
            </div>

          </div>

          {/* Extra Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-gray-100 p-4 rounded-xl text-center">
              <h3 className="text-lg font-semibold text-gray-700">User ID</h3>
              <p className="text-sm text-gray-500 break-all">
                {user?.uid || "N/A"}
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-xl text-center">
              <h3 className="text-lg font-semibold text-gray-700">Provider</h3>
              <p className="text-sm text-gray-500">
                {user?.providerData[0]?.providerId || "N/A"}
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-xl text-center">
              <h3 className="text-lg font-semibold text-gray-700">Verified</h3>
              <p className="text-sm text-gray-500">
                {user?.emailVerified ? "Yes ✅" : "No ❌"}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;