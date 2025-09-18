import React from 'react'
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div>
      <div className=' bg-cover bg-bottom bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen flex pt-5 justify-between flex-col w-full bg-red-400'>
        <img className = "w-28 ml-10 mt-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
        <div className='bg-white py-5 px-5 pb-7'>
            <h2 className='text-3xl font-bold mb-5'>Get Started with Uber</h2>
            <Link to ="/login" className='flex justify-center w-full bg-black text-white py-3 rounded-xl font-medium text-xl'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start;
