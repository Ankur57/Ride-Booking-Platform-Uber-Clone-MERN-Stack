import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { SocketContext } from '../Context/SocketContext'
import axios from 'axios';

const UserLogin = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const { user, setUser } = useContext(UserContext)
  const { socket } = useContext(SocketContext)

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const loginuser = {
      email,
      password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, loginuser);

      if (response.status === 200) {
        // Save user + token
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);

        // 🔹 Emit join event to backend with _id
        if (response.data.user && response.data.user._id) {
          socket.emit("join", {
            userId: response.data.user._id,
            userType: "user",
          });
          console.log("User joined:", response.data.user._id, "socket:", socket.id);
        }

        navigate('/home');
      }

      setemail('')
      setpassword('')
    } catch (error) {
      console.log("Login error:", error);
      alert('Login failed. Please try again.');
    }
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className="w-20 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
        <form onSubmit={submitHandler}>
          <h3 className='text-xl mb-2 font-medium'>What's your email?</h3>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder='email@example.com'
            required
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          />

          <h3 className='text-xl mb-2 font-medium'>Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder='password'
            required
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          />

          <button className='bg-[#111] text-white mb-7 rounded-xl font-semibold px-4 py-2 w-full text-lg placeholder:text-base'>
            Login
          </button>

          <p className='text-center mb-2 text-lg'>
            New here? <Link to="/signup" className='text-blue-600'>Create new Account</Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center p-1 justify-center text-white mb-7 rounded-xl font-semibold px-4 py-2 w-full text-lg placeholder:text-base'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
