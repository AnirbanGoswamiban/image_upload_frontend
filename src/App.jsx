import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignupPage from './Signup/Signup'
import LoginPage from './Login/Login'
import ImageUploadPage from './imageupload/imageupload'
import AboutPage from './About/About'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import Profile from './Profile/Profile'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Navbar/> 
    <Routes>
    <Route path="/" element={<LoginPage/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path="/post" element={<ImageUploadPage/>}></Route>
      <Route path="/about" element={<AboutPage/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
    </Routes>
    <ToastContainer theme='dark' position='top-center'/>
    </div>
    </BrowserRouter>
  )
}

export default App
