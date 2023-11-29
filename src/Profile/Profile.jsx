import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [name, setName] = useState(sessionStorage.getItem('name'));
  const [email, setEmail] = useState(sessionStorage.getItem('email'));
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      token: sessionStorage.getItem('jwt'),
    },
  };

  const handleUpdate = () => {
    if (password) {
      axios
        .put('https://lokiobackend.onrender.com/resetpassword', {
          id: sessionStorage.getItem('id'),
          newpassword: password,
          newusername: name,
          newmail: email,
        }, axiosConfig)
        .then((response) => {
          console.log(response);
        });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('id');
    navigate('/login');
  };

  function checklogin() {
    if (sessionStorage.getItem('jwt')) {
      return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-4">User Profile</h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            <button
              onClick={handleUpdate}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4 ${password ? '' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!password}
            >
              Update
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Logout
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
            <p className="text-lg text-gray-600 mb-8">Please log in to continue.</p>
            <Link to="/login" className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-blue-700">Log In</Link>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      {checklogin()}
    </>
  );
}

export default Profile;
