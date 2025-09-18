import { Link, useLocation } from 'react-router-dom' // Added useLocation
import { useEffect, useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../Components/LiveTracking'

const Ride = (props) => {
     const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

     socket.on("ride-ended", () => {
        navigate('/home')
    })
  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-home-2-line"></i></Link>
        <div className='h-[60%]'>
            <LiveTracking/>
        </div>
        <div className='h-[40%] p-4'>
            <div className='flex items-center justify-between'>
            <img className="h-16 " src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png' alt="Car"></img>
            <div className='text-right'>
                <h2 className='text-lg font-medium'>{ride?.captain.fullname.firstname}</h2>
                <h4 className=' text-xl font-semibold'>{ride?.captain.vehicle.plate}</h4>
                <p>Maruti Suzuki Alto</p>
            </div>
        </div>
       <div className='flex gap-2 flex-col justify-between items-center '>
       <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 border-b-2 '>
            <i className="ri-map-pin-user-line"></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-lg -mt-1 text-gray-600'> {ride?.destination}</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-money-rupee-circle-line"></i>
            <div>
                <h3 className='text-lg font-medium'>{ride?.fare}</h3>
                <p className='text-lg -mt-1 text-gray-600'>Cash</p>
            </div>
        </div>
       </div>
    </div>
    <button className='w-full mt-5 bg-green-600 rounded-lg p-3 text-white font-semibold'>Make a Payment</button>
    </div>
    </div>
  )
}

export default Ride
