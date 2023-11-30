import React from 'react';

function Navigation() {
  function displayLogin() {
    if (sessionStorage.getItem('jwt')) {
      return <li><a href="/profile" className="text-white"> 
      <div className="w-6 h-6 rounded-full  flex items-center justify-center">
      <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' alt='https://cdn-icons-png.flaticon.com/512/9131/9131529.png'/>
      </div></a></li>;
    } else {
      return <li><a href="https://magical-elf-e19ee2.netlify.app/login" className="text-white">Login</a></li>;
    }
  }

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/home" className="text-white text-2xl font-semibold">|Lok.IO|</a>
        <div>
          <ul className="flex space-x-4">
            <li><a href="https://magical-elf-e19ee2.netlify.app/home" className="text-white">Home</a></li>
            <li><a href="https://magical-elf-e19ee2.netlify.app/about" className="text-white">About</a></li>
            <li><a href="https://magical-elf-e19ee2.netlify.app/post" className="text-white">Post</a></li>
            {displayLogin()}  
            {/* This line calls displayLogin to render "Login" or "Logout" */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
