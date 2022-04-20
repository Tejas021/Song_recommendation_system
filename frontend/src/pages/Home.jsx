import React from 'react'
import Navbar from '../components/Navbar'
import '../styles/home.scss'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='banner' style={{
        backgroundImage:`linear-gradient(
          to bottom,
          transparent,
          rgba(31, 31, 31, 0.5),
          #111
        ),url(https://images3.alphacoders.com/123/thumbbig-123037.webp)`,
        backgroundPosition:"center center"
      }}>

      </div>
    </div>
  )
}

export default Home