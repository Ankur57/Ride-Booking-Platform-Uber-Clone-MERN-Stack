import { Link } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import { useState,useEffect, useContext } from 'react'
import { useRef } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from 'gsap'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp';
import { SocketContext } from '../Context/SocketContext'
import { CaptainDataContext } from '../Context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../Components/LiveTracking'

const CaptainHome = () => {
  const [RidePopUpPanel,setRidePopUpPanel] = useState(false)
  const RidePopUpPanelRef = useRef(null);
  const ConfirmedRidePopUpRef = useRef(null); 
  const [ConfirmedRidePopUp, setConfirmedRidePopUp] = useState(false)
  const [ ride, setRide ] = useState(null)

   const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
      if (socket && captain?._id) {
          socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
          })
        }
    }, [socket, captain])

    
      const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }
        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

      socket.on('new-ride', (data) => {
        console.log("THIS IS socket.on(new-ride...................")
        console.log(data)
        setRide(data)
        setRidePopUpPanel(true)

    })
     async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopUpPanel(false)
        setConfirmedRidePopUp(true)

    }
  useGSAP(()=>{
    if(RidePopUpPanel){
      gsap.to(RidePopUpPanelRef.current, {
        transform : 'translateY(0)'
    })
    } else{
          gsap.to(RidePopUpPanelRef.current, {
            transform: 'translateY(100%)'
    })
    }

  },[RidePopUpPanel])

    useGSAP(()=>{
    if(ConfirmedRidePopUp){
      gsap.to(ConfirmedRidePopUpRef.current, {
        transform : 'translateY(0)'
    })
    } else{
          gsap.to(ConfirmedRidePopUpRef.current, {
            transform: 'translateY(100%)'
    })
    }

  },[ConfirmedRidePopUp])




  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0 w-full flex items-center justify-between'>
        <img className = "w-20 mt-10 ml-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
      <Link to='/home' className='mt-10 ml-5 fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i></Link>
      </div>
      <div className='h-[70%]'>
          <LiveTracking/>
      </div>
      <div className='h-[30%] p-4 '>
        <CaptainDetails/>
      </div>
      <div ref = {RidePopUpPanelRef} style={{ transform: 'translateY(100%)' }} className='h-[65%] bg-white fixed z-20 bottom-0 px-3 py-6 w-full'>
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmedRidePopUp={setConfirmedRidePopUp}
          confirmRide={confirmRide}
        />
      </div>
      <div ref = {ConfirmedRidePopUpRef} style={{ transform: 'translateY(0%)' }} className='h-screen bg-white fixed z-20 bottom-0 px-3 py-6 w-full'>
        <ConfirmRidePopUp
        ride = {ride}
         setConfirmedRidePopUp = {setConfirmedRidePopUp}
         setRidePopUpPanel = {setRidePopUpPanel}/>  
      </div>
    </div>
  )
}

export default CaptainHome
