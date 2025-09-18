import { useContext } from "react"
import {CaptainDataContext} from '../Context/CaptainContext'
const CaptainDetails = () => {
  const {captain} = useContext(CaptainDataContext);


  return (
    <div>
      <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between gap-4'>
            <img className = "h-14 w-16 rounded-full object-cover "src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnawKVXvPsT-MbLwKQl__Ffu0AE2Wh0cJBKQ&s" alt="User"/>
            <h4 className='text-lg font-medium'>{captain.fullname.firstname + " " + captain.fullname.lastname }</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>₹290.54</h4>
            <p className='text-sm font-medium text-gray-600'>Earned</p>
          </div>
        </div>
        <div className='flex bg-gray-200 mt-5 p-3 rounded-xl justify-center gap-4 items-start'>
          <div className='text-center'>
            <i className="text-3xl font-thin ri-time-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-small text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-small text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl font-thin ri-booklet-line"></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-small text-gray-600'>Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
