import React from 'react'
import { Link } from 'react-router-dom'
import uberLogoWhite from "../assets/uberLogoWhite.png"

const Home = () => {
  return (
    <div className="flex flex-col justify-between h-screen w-screen bg-cover bg-[left_bottom_2rem] bg-slate-600 bg-[url('/src/assets/trafficBg.jpg')]" >
        <img src={uberLogoWhite} className='w-20 pt-4 pl-4'/>
        <div className='bg-white py-6 px-4'>
          <h2 className='text-3xl font-bold mb-4'>Get Started with Uber</h2>
          <Link to="/login" className='flex py-3 bg-black text-white rounded justify-center'>Continue</Link>
        </div>
    </div>
  )
}

export default Home