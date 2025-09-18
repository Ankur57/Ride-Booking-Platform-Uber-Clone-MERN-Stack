import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

  const navigate = useNavigate()

  async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId: props.ride._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }

    }

  return (
    <div>
       <h5 onClick={()=>{
        props.setfinishRidePanel(false)
       }}
         className='  text-center absolute top-0 w-full'> <i className=" text-3xl text-gray-500 font-extrabold ri-arrow-down-s-line"></i></h5>
       <h3 className='text-2xl font-bold mb-5'>Finish this ride</h3>
       <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img className = "h-14 w-16 rounded-full object-cover "src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnawKVXvPsT-MbLwKQl__Ffu0AE2Wh0cJBKQ&s" alt="User"/>
          <h2 className='font-semibold text-lg'>{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className='font-semibold text-lg'>2.2km</h5>
       </div>
       <div className='flex gap-2 flex-col justify-between items-center '>

       <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=" text-lg ri-map-pin-fill"></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-lg -mt-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2 '>
            <i className="ri-map-pin-user-line"></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-lg -mt-1 text-gray-600'> {props.ride?.destination}r</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-money-rupee-circle-line"></i>
            <div>
                <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
                <p className='text-lg -mt-1 text-gray-600'>Cash</p>
            </div>
        </div>
          
        <button
           onClick={endRide}
        className=' flex justify-center w-full mt-5 bg-green-600 rounded-lg p-3 text-white font-semibold'>Finish Ride</button>
        <p className='text-red-500 text-sm mt-6'>Click on finish ride button if you have completed the payment.</p>

       </div>
    </div>
    </div>
  )
}

export default FinishRide
