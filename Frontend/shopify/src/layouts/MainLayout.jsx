import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'


function MainLayout() {
  const [category,setCategory] =useState("")
  return (
    <div className='min-h-screen flex flex-col bg-black border-b-transparent'>
<Navbar/>

<div className='flex flex-1'>
  <main className='flex-1 border-y-gray-500'>
    <Outlet  context={{category}}/>
  </main>
</div>

<Footer/>
    </div>
  )
}

export default MainLayout