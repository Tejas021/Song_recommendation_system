import React, { useState } from 'react'
import { request } from '../axios'
import "../styles/recommender.scss"
import loading from './loader.webp'


const Recommender = () => {
  const [info, setInfo] = useState({ name: "", songname: "" })
  const [songs, setSongs] = useState(null)
  const [loader,setLoader]=useState(false)
  const submitReq = async (e) => {
    e.preventDefault()
    setLoader(true)
    request.post("/song", info).then(res => res.data).then(res => {setSongs(res); setLoader(false)})

  }
  return (
    <div className='recommender_container'>
      <h2 className='title'>Find Recommendation</h2>
      <form onSubmit={e => submitReq(e)}>

        <input type="text" placeholder="songname" onChange={(e) => setInfo({ ...info, songname: e.target.value })} />
        <input className='mt-2' type="text" placeholder="artist" onChange={(e) => setInfo({ ...info, name: e.target.value })} />
        <button className='mt-4' type="submit " >Submit</button>
      </form>

      <div className='row  '>
        {songs ? songs.map(sg => <div className=' col-md-3'><div class="card bg-success my-3 " style={{ width: "100%" }}>
          <img src="https://images.squarespace-cdn.com/content/v1/5bef06e6fcf7fd06b84df720/1546871259656-4VRXA8OLY0XHMVEKMDOW/Devon%2BSong%2BBanner.jpg?format=2500w" class="card-img-top" alt="..." />
          <div class="card-body ">
            <p class="card-text "><b>{sg.song}</b></p>
          </div></div>
        </div>) : 
        <div className='text-center mt-3'>
          {loader?<img  src={loading} alt=""  />: ''}
        </div>
        }
      </div>
    </div>
  )
}

export default Recommender