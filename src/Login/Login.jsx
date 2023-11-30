import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import {useNavigate } from 'react-router-dom'



function LoginPage() {
  const [formData, setFormData] = useState({
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };

      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post('https://lokiobackend.onrender.com/login', data, axiosConfig);

      if (response.status === 200) {
        console.log(response.data);
        sessionStorage.setItem('jwt',response.data.token)
        sessionStorage.setItem('id',response.data.id)
        sessionStorage.setItem('name',response.data.name)
        sessionStorage.setItem('email',response.data.email)
        notify_success(response.data.message)
        navigate("/home")
      } else {
        console.log(response.data.error);
        notify_error(response.data.message)
      }
    } catch (err) {
      notify_error(err.response.data.error)
       
    }
  };

  return (
    <div className="login-page min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 lg:w-1/3 shadow-lg">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <form onSubmit={handleFormSubmit}>
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
            Login
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-2">
          Don't have an account?{' '}
          <a href="https://magical-elf-e19ee2.netlify.app/signup" className="text-blue-500">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
