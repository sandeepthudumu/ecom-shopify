import React, { useState } from 'react'
import { registerUser } from '../Apis/auth'
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    const [form,setForm]=useState({
        username:"",
        email:"",
        first_name:"",
        last_name:"",
        password:"",
        role:"user"
    })

    const handleChange =(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleRegister =async(e)=>{
        e.preventDefault();
        try{
            await registerUser(form);
            alert("Registration successful");
            Navigate("/login")
        }catch(error){
            alert("Registration failed")
        }
    }
  return (
    <div className='max-w-md mx-auto bg-white mt-12 mb-5 p-6 rounded-lg shadow'>
        <h2 className='text-2xl font-bold mb-5'>Register</h2>
        
        <form onSubmit={handleRegister}>
            <input type="text" name='username' className='border p-3 rounded-lg w-full mb-3' placeholder='Username' onChange={handleChange} />

            <input type="text" name='email' className='border p-3 rounded w-full mb-3'
            placeholder='Email' onChange={handleChange} />
          
          <input type="text" name='first_name' className='border p-3 rounded w-full mb-3' placeholder='fist name' onChange={handleChange} />
<input
  type="text"
  name="last_name"
  className="border p-3 rounded w-full mb-3"
  placeholder="Last Name"
  onChange={handleChange}
/>
          <input type="password" className='border p-3 rounded-lg w-full mb-3' placeholder='Password' onChange={handleChange} name='password'  />

          <button className='bg-gray-700 text-white w-full py-3 rounded-lg'>Register</button>
        </form>
        
        </div>
        
  )
}

export default Register