import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel'
import VehiclePanel from '../Components/VehiclePanel'
import ConfirmedRide from '../Components/ConfirmedRide'
import LookingForDriver from '../Components/LookingForDriver'
import { SocketContext } from '../Context/SocketContext';
import WaitingForDriver from '../Components/WaitingForDriver'
import LiveTracking from '../Components/LiveTracking';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false)
  const [fare, setFare] = useState({});
  const panelRef = useRef(null);
  const [VehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const [activeField, setActiveField] = useState(null)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [ConfirmedRidePanel, setConfirmedRidePanel] = useState(false)
  const ConfirmPanelRef = useRef(null);
  const VehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const [VehicleFound, setVehicleFound] = useState(false)
  const [WaitingForDriverPanel, setWaitingForDriverPanel] = useState(false)
  const [vehicleType, setvehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const navigate = useNavigate()
  const { socket } = useContext(SocketContext);


  useEffect(() => {
    if (!socket) return;

    const handleRideConfirmed = (ride) => {
      setVehicleFound(false);
      setWaitingForDriverPanel(true);
      setRide(ride);
    };

    const handleRideStarted = (ride) => {
      setWaitingForDriverPanel(false);
      navigate('/riding', { state: { ride } });
    };

    socket.on('ride-confirmed', handleRideConfirmed);
    socket.on('ride-started', handleRideStarted);

    // cleanup
    return () => {
      socket.off('ride-confirmed', handleRideConfirmed);
      socket.off('ride-started', handleRideStarted);
    };
  }, [socket, navigate]);


  useGSAP(() => {
    if (VehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [VehiclePanelOpen])

  useGSAP(() => {
    if (VehicleFound) {
      gsap.to(VehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(VehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [VehicleFound])

  useGSAP(() => {
    if (ConfirmedRidePanel) {
      gsap.to(ConfirmPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ConfirmPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [ConfirmedRidePanel])

  useGSAP(() => {
    if (WaitingForDriverPanel) {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [WaitingForDriverPanel])

  const SubmitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? '80%' : '0%'
    })

  }, [panelOpen])


  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data)
    } catch {
      // handle error
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch {
      // handle error
    }
  }

  async function findTrip() {
    setVehiclePanelOpen(true);
    setPanelOpen(false);

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data)
    setFare(response.data)
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log("THIS IS CREATE RIDE FUNCTION HERE....")
    console.log(response.data)
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className="w-20 absolute left-9 top-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
      <div className='h-screen w-screen'>
        <LiveTracking />
      </div>
      <div className=' h-screen flex flex-col justify-end top-0 absolute w-full'>
        <div className='h-[30%] bg-white p-5 relative '>
          <h5 onClick={() => {
            setPanelOpen(false)
          }} className='absolute right-4 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-3xl font-bold'>Find a Trip</h4>
          <form onSubmit={(e) => { SubmitHandler(e) }}>
            <div className='line absolute h-16 w-1 top-[40%] left-10 bg-gray-800 rounded-full'></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              type="text"
              placeholder='Enter pickup location'
              required className='bg-[#eee] mt-7 mb-4 rounded px-12 py-2 border w-full text-lg placeholder:text-base'></input>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}
              type="text"
              placeholder='Enter your destination'
              required className='bg-[#eee]  rounded px-12 py-2 border w-full text-lg placeholder:text-base'></input>
          </form>
          <button onClick={findTrip}
            className=' mt-5 bg-[#111] text-white mb-7 rounded-xl font-semibold px-4 py-2 w-full text-lg placeholder:text-base'>
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} style={{ transform: 'translateY(100%)' }} className=' bg-white fixed z-10 bottom-0 px-3 py-6 w-full'>
        <VehiclePanel
          setvehicleType={setvehicleType}
          fare={fare}
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>
      {ConfirmedRidePanel && (
        <div ref={ConfirmPanelRef} className=' bg-white translate-y-full  fixed z-10 bottom-0 px-3 py-6 w-full'>
          <ConfirmedRide
            createRide={createRide}
            pickup={pickup}
            fare={fare}
            vehicleType={vehicleType}
            destination={destination}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setConfirmedRidePanel={setConfirmedRidePanel}
            setVehicleFound={setVehicleFound} />
        </div>
      )}
      {VehicleFound && (
        <div ref={VehicleFoundRef} style={{ transform: 'translateY(100%)' }} className=' bg-white fixed z-10 bottom-0 px-3 py-6 w-full'>
          <LookingForDriver
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setVehicleFound={setVehicleFound}
          />
        </div>
      )}
      <div ref={WaitingForDriverRef} style={{ transform: 'translateY(100%)' }} className=' bg-white fixed z-10 bottom-0 px-3 py-6 w-full'>
        <WaitingForDriver
          ride={ride}
          setWaitingForDriverPanel={setWaitingForDriverPanel}
        />
      </div>

    </div>
  )
}

export default Home
