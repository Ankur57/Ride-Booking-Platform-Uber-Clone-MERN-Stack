
const ConfirmedRide = (props) => {
  return (
    <div>
       <h5 onClick={()=>{
        props.setConfirmedRidePanel(false)
       }}  className='  text-center absolute top-0 w-full'> <i className=" text-3xl text-gray-500 font-extrabold ri-arrow-down-s-line"></i></h5>
       <h3 className='text-2xl font-bold mb-5'>Confirm your Ride</h3>
       <div className='flex gap-2 flex-col justify-between items-center '>
        <img className="h-20 " src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png' alt="Car"></img>
       <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className=" text-lg ri-map-pin-fill"></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-lg -mt-1 text-gray-600'>{props.pickup}</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2 '>
            <i className="ri-map-pin-user-line"></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-lg -mt-1 text-gray-600'> {props.destination}</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-money-rupee-circle-line"></i>
            <div>
                <h3 className='text-lg font-medium'>{props.fare[props.vehicleType]}</h3>
                <p className='text-lg -mt-1 text-gray-600'>Cash</p>
            </div>
        </div>
        <button onClick={()=>{
            props.setVehicleFound(true)
            props.setConfirmedRidePanel(false)
            props.createRide()
        }} className='w-full mt-5 bg-green-600 rounded-lg p-3 text-white font-semibold'>Confirm</button>
       </div>
    </div>
    </div>
    
  )
}

export default ConfirmedRide
