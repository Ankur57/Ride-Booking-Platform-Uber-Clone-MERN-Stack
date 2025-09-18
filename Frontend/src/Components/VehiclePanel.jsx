
const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={()=>{
        props.setVehiclePanelOpen(false)
       }}  className='  text-center absolute top-0 w-full'> <i className=" text-3xl text-gray-500 font-extrabold ri-arrow-down-s-line"></i></h5>
        <h3 className='text-2xl font-bold mb-5'>Choose a Vehicle</h3>
        <div onClick={()=>{
          props.setConfirmedRidePanel(true)
          props.setVehiclePanelOpen(false)
          props.setvehicleType('car')
        }} className='bg-white border-2 mb-5 active:border-black rounded-xl flex w-full p-3 items-center justify-between'>
          <img className="h-14 w-18" src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png' alt="Car"></img>
          <div className='w-1/2'>
            <h4 className='font-medium text-lg'>UberGo  <span><i className="ri-user-3-line"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='text-gray-600'>Affordable,compact rides</p>
          </div>
          <h2 className='text-2xl'><span><i className="ri-money-rupee-circle-line"></i>{props.fare.car}</span></h2>
        </div>
        <div onClick={()=>{
          props.setConfirmedRidePanel(true)
          props.setVehiclePanelOpen(false)
          props.setvehicleType('moto')
        }} className='bg-white border-2 mb-5 active:border-black rounded-xl flex w-full p-3 items-center justify-between'>
          <img className="h-14" src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png' alt="Moto"></img>
          <div className='w-1/2'>
            <h4 className='font-medium text-lg'>Moto<span><i className="ri-user-3-line"></i>1</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='text-gray-600'>Affordable,Motercycle rides</p>
          </div>
          <h2 className='text-2xl'><span><i className="ri-money-rupee-circle-line"></i>{props.fare.moto}</span></h2>
        </div>
        <div onClick={()=>{
          props.setConfirmedRidePanel(true)
          props.setVehiclePanelOpen(false)
          props.setvehicleType('auto')
        }} className=' border-2 mb-5 active:border-black bg-white rounded-xl flex w-full p-3 items-center justify-between'>
          <img className="h-14" src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' alt="Auto"></img>
          <div className='w-1/2'>
            <h4 className='font-medium text-lg'>Auto<span><i className="ri-user-3-line"></i>3</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='text-gray-600'>Affordable, auto rides</p>
          </div>
          <h2 className='text-2xl'><span><i className="ri-money-rupee-circle-line"></i>{props.fare.auto}</span></h2>
        </div>
    </div>
  )
}

export default VehiclePanel
