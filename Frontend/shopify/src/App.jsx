import React from 'react'
import { BrowserRouter,Routes ,Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Products from './pages/Products'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from "./components/Home"
import FeaturedCollection from "./components/FeaturedCollection"
import AboutUs from "./components/AboutUs"
import Cart from "./pages/Cart"
import Payment from "./pages/Payment"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
                  <Route index element={<Home />} />

        <Route path="/products" element={<Products/>}/>
         <Route
            path="/cart"
            element={
                <Cart />
            }
          />

          <Route
            path="/payment"
            element={
                <Payment />
            }
          />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path='/featuredcollection' element={<FeaturedCollection/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
