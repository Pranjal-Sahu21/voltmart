import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'

const App = () => {

  const [location, setLocation] = useState();
  const [openDropDown, setOpenDropDown] = useState(false);

  const getLocation = async() => {
    navigator.geolocation.getCurrentPosition( async pos => {
      const {latitude, longitude} = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;      
      try {
        const location = await axios.get(url);
        const exactLocation = location?.data?.address;
        setLocation(exactLocation);
        setOpenDropDown(false);

      } catch (error) {
        console.error(error);        
      }
    }
    )
  }
  
  useEffect(() => {
    getLocation()
  }, [])
  

  return (
    <BrowserRouter>
    <Navbar location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App