import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FileCard from '../Card/Card';
import axios from 'axios';
import { toast } from 'react-toastify'
import {Link, useNavigate } from 'react-router-dom'

function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const notify_error= (msg) => toast.error(msg)
  const notify_success= (msg) => toast.success(msg)
  const navigate=useNavigate()


function checklogin(){
  if (sessionStorage.getItem('jwt')) {
    return(
      <div className="p-4">
      <div className="mb-4 flex items-center p-2 rounded-md bg-gray-200">
  <div className="w-8 h-8 rounded-full flex items-center justify-center">
    <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
  </div>
  <input
    type="text"
    placeholder="Search by filename"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-64 h-8 pl-6 rounded-r-md focus:outline-none focus:ring focus:border-blue-300"
  />
</div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item, index) => (
            <div key={index} className="group cursor-pointer transform hover:scale-105 transition-transform">
            <FileCard {...item} />
          </div>
          ))}
        </div>
      </div>
    )
  }else{
    return(
      <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
        <p className="text-lg text-gray-600 mb-8">Please log in to continue.</p>
        <Link to="/login" className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-blue-700">Log In</Link>
      </div>
    </div>
    )
  }
}




  useEffect(() => {
    async function fetchData() {
      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          "token": sessionStorage.getItem("jwt")
        };
        const response = await axios.get('https://lokiobackend.onrender.com/posts', { headers });
        
        const newData = response.data.map(x => ({
          filename: x.fileName,
          fileType: x.fileType,
          postedBy: x.userName,
          fileId:x.fileId,
          url:x.url
        }));

        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const filteredData = data.filter(item =>
    item.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      {checklogin()}
    </>
  );
}

export default Home;
