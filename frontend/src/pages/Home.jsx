import React from 'react'
import Navbar from '../components/Navbar'
import Recommender from '../components/Recommender'
import SongRankings from '../components/SongRankings'
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
        ),url(https://t4.ftcdn.net/jpg/01/16/59/33/240_F_116593337_QLHpCSQDgllQlKkvRGCqVzdvIR9AEdxU.jpg)`,
        backgroundPosition:"center center"
      }}>
     
      </div>
      <SongRankings/>
      <Recommender/>
    </div>
  )
}

export default Home