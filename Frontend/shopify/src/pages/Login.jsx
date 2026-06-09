import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {loginUser} from "../Apis/auth"
import { AuthContext } from '../context/Authcontext'

const Login = () => {
    const [username,setUsername] =useState('')
    const [password,setPassword] =useState('')
      const { authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();


    const handleLogin =async(e)=>{
        e.preventDefault();

        try{
            const res =await loginUser(username,password);

            localStorage.setItem("token",res.data.access_token)
             authDispatch({type:"LOGIN",payload:res.data.access_token})
             navigate('/home')
        }catch(error){
            alert("Invalid username or password")
        }
    }
  return (
    <div className='max-w-md mx-auto bg-white mt-10 p-6 rounded shadow'>
<h2 className='text-2xl font-bold mb-5'>Login</h2>

<form onSubmit={handleLogin} >
    <input type="text"
    className='border p-3 rounded w-full mb-4'
    placeholder='Username'
    value={username} 
    onChange={(e)=>setUsername(e.target.value)}/>


    <input type="text" 
    className='border p-3 rounded w-full mb-4'
    placeholder='Password'
    value={password}
    onChange={(e)=>setPassword(e.target.value)}/> 

    <button className='bg-gray-700 text-white w-full py-3 rounded'>
        Login
    </button>

</form>

<p className='mt-4'>
    New user?{''}
    <NavLink to="/register" className="text-blue-600">Register</NavLink>
</p>
    </div>
  )
}

export default Login