import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import {useNavigate } from 'react-router-dom'



function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const notify_error= (msg) => toast.error(msg)
  const notify_success= (msg) => toast.success(msg)
  const navigate=useNavigate()


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async(e) => {
    try{
    e.preventDefault();
    const data={
      name:formData.username,
      email:formData.email,
      password:formData.password
    }
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const response = await axios.post('https://lokiobackend.onrender.com/sign_up', data, axiosConfig)
    if(response.status=='200'){
      console.log(response.data.message);
      notify_success(response.data.message)
      navigate('/login')
    }else{
      console.log(response.data.error);
    }
  }catch(err){
    notify_error(err.response.data.error)
  }

  };

  return (
    <div className="signup-page min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 lg:w-1/3 shadow-lg">
        <h2 className="text-2xl mb-4 text-center">Signup</h2> {/* Added 'text-center' class */}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-2">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
