import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { CaptainDataContext } from '../Context/CaptainContext'

const CaptainLogin = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const {captain, setCaptain} = React.useContext(CaptainDataContext)  
  const navigate = useNavigate();

const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain)

      if (response.status === 200) {
        const data = response.data

        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')

      }

      setemail('')
      setpassword('')
  } catch(error){
      console.log("Login error:", error);
      alert('Invalid Credentials. Please try again.');
  }
}

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className = "w-20 mb-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s "></img>
      <form onSubmit={(e)=>{
        submitHandler(e);
      }}>
        <h3 className='text-xl mb-2 font-medium'>What's your email?</h3>
        <input
        value={email}
        onChange={(e)=>{
          setemail(e.target.value)
        }}
         type="email"
         placeholder='email@example.com'
         required className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'></input>

        <h3 className='text-xl mb-2 font-medium'>Enter Password</h3>
        <input
         value={password}
        onChange={(e)=>{
          setpassword(e.target.value)
        }}
         type="password"
         placeholder='password'
          required
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'/>
        <button className='bg-[#111] text-white mb-7 rounded-xl font-semibold px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        <p className='text-center mb-2 text-lg'>Join a fleet?   <Link to="/captain-signup" className='text-blue-600'>Register as a Captain</Link></p>
      </form>
      </div>
      <div>
        <Link to='/login' className='bg-[#d5622d] flex items-center p-1 justify-center text-white mb-7 rounded-xl font-semibold px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>

    </div>
  )
}

export default CaptainLogin
