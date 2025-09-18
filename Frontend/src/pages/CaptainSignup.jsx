import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { CaptainDataContext } from '../Context/CaptainContext'


const CaptainSignup = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname,setlastname] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [vehicleColor,setVehicleColor] = useState('')
  const [vehicleCapacity,setVehicleCapacity] = useState('')
  const [vehiclePlate,setVehiclePlate] = useState('')

  const navigate = useNavigate();

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      email,
      password,
      fullname: {
        firstname,
        lastname
      },
      vehicle: {
        type: vehicleType,
        color: vehicleColor,
        capacity: vehicleCapacity,
        plate: vehiclePlate
      }
    };

    const response  = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);
    if(response.status === 201){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token',data.token);
      navigate('/captain-home');
    }

    setemail('')
    setpassword('')
    setfirstname('')
    setlastname('')
    setVehicleType('')
    setVehicleCapacity('')
    setVehicleColor('')
    setVehiclePlate('')
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
       <img className = "w-20 mb-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s "></img>
      <form onSubmit={(e)=>{
        submitHandler(e);
      }}>
        <h3 className='text-xl mb-2 font-medium'>What's your name?</h3>
        <div className='flex w-full'>
        <div>
        <input
        value={firstname}
        onChange={(e)=>{
          setfirstname(e.target.value)
        }}
         type="text"
         placeholder='First Name'
         required className='bg-[#eeeeee] w-3/4 mb-7 rounded px-5 py-2 border text-lg placeholder:text-base'></input>
         </div>
         <div>
        <input
        value={lastname}
        onChange={(e)=>{
          setlastname(e.target.value)
        }}
         type="text"
         placeholder='Last Name'
         required className='bg-[#eeeeee] mr-10 w-3/4 mb-7 rounded px-4 py-2 border text-lg placeholder:text-base'></input>
         </div>
         </div>
         

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

        <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

        <button className='bg-[#111] text-white mb-7 rounded-xl font-semibold px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain Account</button>
        <p className='text-center mb-2 text-lg'>Already have an Account?  <Link to="/captain-login" className='text-blue-600'>Login</Link></p>
      </form>
      </div>
      <div>
        <p>This site is protected by reCAPTCHA and the Google Privacy Policy and terms of Service apply</p>
      </div>

    </div>
  )
}

export default CaptainSignup
