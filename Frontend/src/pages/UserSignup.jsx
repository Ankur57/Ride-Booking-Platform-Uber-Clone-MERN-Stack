import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import { SocketContext } from '../Context/SocketContext'

const UserSignup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)
  const { socket } = useContext(SocketContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
      fullname: {
        firstname,
        lastname
      }
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser);

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);

        // 🔹 Emit join event to backend with _id
        if (data.user && data.user._id) {
          socket.emit("join", {
            userId: data.user._id,
            userType: "user",
          });
          console.log("User signed up & joined:", data.user._id, "socket:", socket.id);
        }

        navigate('/home');
      }

      setemail('')
      setpassword('')
      setfirstname('')
      setlastname('')
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. The email might already be in use. Please try again.");
    }
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img
          className="w-20 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className='text-xl mb-2 font-medium'>What's your name?</h3>
          <div className='flex w-full'>
            <div>
              <input
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                type="text"
                placeholder='First Name'
                required
                className='bg-[#eeeeee] w-3/4 mb-7 rounded px-5 py-2 border text-lg placeholder:text-base'
              />
            </div>
            <div>
              <input
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                type="text"
                placeholder='Last Name'
                required
                className='bg-[#eeeeee] mr-10 w-3/4 mb-7 rounded px-4 py-2 border text-lg placeholder:text-base'
              />
            </div>
          </div>

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
            SignUp
          </button>

          <p className='text-center mb-2 text-lg'>
            Already have an Account? <Link to="/login" className='text-blue-600'>Login Here</Link>
          </p>
        </form>
      </div>

      <div>
        <p>
          By proceeding, you consent to get calls, Whatsapp or SMS messages,
          including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
