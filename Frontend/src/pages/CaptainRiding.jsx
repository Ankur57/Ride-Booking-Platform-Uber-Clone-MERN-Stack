import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import FinishRide from '../Components/FinishRide';
import { useState } from 'react'
import { useRef } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import LiveTracking from '../Components/LiveTracking';

const CaptainRiding = () => {

    const [finishRidePanel, setfinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null);
    const location = useLocation();
    const rideData = location.state?.ride

    useGSAP(()=>{
    if(finishRidePanel){
      gsap.to(finishRidePanelRef.current, {
        transform : 'translateY(0)'
    })
    } else{
          gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
    })
    }

  },[finishRidePanel])


  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0 w-full flex items-center justify-between'>
        <img className = "w-20 mt-10 ml-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
      <Link to='/home' className='mt-10 ml-5 fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i></Link>
      </div>
      <div className='h-[76%]'>
          <LiveTracking/>
      </div>
      <div
        onClick={()=>{
            setfinishRidePanel(true)
        }}
      className='h-[24%] p-4 flex flex-col items-center bg-yellow-400 '>
        
         <h5 onClick={()=>{
        props.setRidePopUpPanel(false)
       }}
         className=' text-center top-0 w-full'> <i className=" text-3xl text-gray-500 font-extrabold ri-arrow-up-wide-line"></i></h5>
        <h4 className='font-semibold text-xl mt-4'>4 KM Away</h4>
        <button className='w-full mt-5 bg-green-600 rounded-lg p-3 text-white font-bold'>Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} style={{ transform: 'translateY(100%)' }} className='h-screen bg-white fixed z-10 bottom-0 px-3 py-6 w-full'>
        <FinishRide
        ride={rideData}
        setfinishRidePanel = {setfinishRidePanel} />
      </div>
      
    </div>
  )
}

export default CaptainRiding
