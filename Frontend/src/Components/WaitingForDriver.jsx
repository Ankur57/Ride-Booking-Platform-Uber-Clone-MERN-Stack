

const WaitingForDriver = (props) => {
  return (
    <div>
       <h5 onClick={()=>{
        props.setWaitingForDriverPanel(false)
       }}  className='  text-center absolute top-0 w-full'> <i className=" text-3xl text-gray-500 font-extrabold ri-arrow-down-s-line"></i></h5>
        <div className='flex items-center justify-between'>
            <img className="h-16 " src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png' alt="Car"></img>
            <div className='text-right'>
                <h2 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname}</h2>
                <h4 className=' text-xl font-semibold'>{props.ride?.captain.vehicle.plate}</h4>
                <p>Maruti Suzuki Alto</p>
                <h1 className='text-lg font-semibold'>  {props.ride?.otp} </h1>
                </div>
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
                <p className='text-lg -mt-1 text-gray-600'> {props.ride?.destination}</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-money-rupee-circle-line"></i>
            <div>
                <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
                <p className='text-lg -mt-1 text-gray-600'>Cash</p>
            </div>
        </div>
       </div>
    </div>
    </div>
  )
}

export default WaitingForDriver
