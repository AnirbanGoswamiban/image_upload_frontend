import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';



const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [key,setkey]=useState(null)
  const [isUploading, setIsUploading] = useState(false);

  const notify_error= (msg) => toast.error(msg)
  const notify_success= (msg) => toast.success(msg)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can use the 'FileReader' API to preview the selected image if needed.
      // For simplicity, we are not previewing the image in this example.
      setSelectedImage(file);
    }
  };
  const handletextChange=(e)=>{
    setkey(e.target.value)
  }


  const handleUpload = () => {
    // You can send 'selectedImage' to your backend for further processing or storage.
    if (selectedImage) {
   
      let filename=selectedImage.name.split('.')

      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('key',key);
      formData.append('name',filename[0])
      formData.append('type',filename[1])
      
      const headers = {
        "Content-Type": "multipart/form-data", 
        "token": sessionStorage.getItem("jwt") 
      };
      axios.post('https://lokiobackend.onrender.com/create_post',formData,{headers:headers}).then((e)=>{
        if(e.status===200){
          setIsUploading(false)
          notify_success(e.data.message)
        }
      }).catch((err)=>{
        setIsUploading(false)
        notify_error(err.response.data.error)
      })
    }
  };


  function logincheck(){
    if (sessionStorage.getItem('jwt')) {
      return(
        <>  <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Upload an Image</h2>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="file-input"
            encType="multipart/form-data"
          />
          <label
            htmlFor="file-input"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
          >
            Choose a File
          </label>
          <span className="ml-2" id="file-name">
            {selectedImage ? selectedImage.name : 'No file chosen'}
          </span>
        </div>
    
        {/* Display the chosen image */}
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Chosen Image"
            className="max-w-full mb-4 rounded-md"
          />
        )}
    
        {/* Conditional rendering for the loader */}
        {isUploading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-4"></div>
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter a key of size 16"
              onChange={handletextChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
    
            <button
              onClick={() => {
                setIsUploading(true); // Set the upload state to true when the button is clicked
                handleUpload(); // Trigger the upload function
              }}
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
              disabled={!selectedImage || isUploading}
            >
              Upload
            </button>
          </>
        )}
      </div></>
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

  return (
  <>
  {logincheck()}
  </>
  );
};

export default ImageUpload;
