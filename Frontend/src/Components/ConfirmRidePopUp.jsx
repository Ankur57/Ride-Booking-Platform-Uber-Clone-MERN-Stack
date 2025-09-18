import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
  const [otp, setotp] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmedRidePopUp(false)
            props.setRidePopUpPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }


    }
  return (
    <div>
       <h5 onClick={()=>{
        props.setRidePopUpPanel(false)
       }}
         className='  text-center absolute top-0 w-full'> <i className=" text-3xl text-gray-500 font-extrabold ri-arrow-down-s-line"></i></h5>
       <h3 className='text-2xl font-bold mb-5'>Confirm this ride to start</h3>
       <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img className = "h-14 w-16 rounded-full object-cover "src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnawKVXvPsT-MbLwKQl__Ffu0AE2Wh0cJBKQ&s" alt="User"/>
          <h2 className='font-semibold text-lg capitalize'>{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className='font-semibold text-lg'>2.2km</h5>
       </div>
       <div className='flex gap-2 flex-col justify-between items-center '>

       <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=" text-lg ri-map-pin-fill"></i>
            <div>
                <h3 className='text-lg font-medium'>56/11-A</h3>
                <p className='text-lg -mt-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2 '>
            <i className="ri-map-pin-user-line"></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-lg -mt-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-money-rupee-circle-line"></i>
            <div>
                <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
                <p className='text-lg -mt-1 text-gray-600'>Cash</p>
            </div>
        </div>
        <form onSubmit={(e)=>{
            submitHandler(e);
        }
        }>
          <input onChange={(e)=>{
            setotp(e.target.value)
          }}
          value={otp}
          type="text"
          placeholder='Enter OTP'
          required className='bg-[#eee] text-center rounded-xl px-6 py-2 mt-5 border w-full text-lg placeholder:text-lg'></input>
        <button className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
          <button onClick={() => {
              props.setConfirmedRidePopUp(false)
              props.setRidePopUpPanel(false)

          }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>
        </form>
       </div>
    </div>
    </div>
  )
}

export default ConfirmRidePopUp
