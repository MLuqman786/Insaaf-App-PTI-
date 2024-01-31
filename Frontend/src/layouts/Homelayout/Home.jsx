import React from 'react'
import Navbar from '../../components/Navbar/navbar'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
     <div className=''>
    <Navbar />
    <Outlet  />
    <Footer/>
    </div>
  )
}

export default HomeLayout