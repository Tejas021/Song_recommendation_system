import React, { useState } from 'react'
import { request } from '../axios'
const Recommender = () => {
    const [info, setInfo] = useState({name:"",songname:""})
    const [songs, setSongs] = useState(null)
    const submitReq=async(e)=>{
        e.preventDefault()
        request.post("/song",info).then(res=>res.data).then(res=>setSongs(res))
        
    }
  return (
    <div>

        <form onSubmit={e=>submitReq(e)}>
            <input type="text" placeholder="name" onChange={(e)=>setInfo({...info,name:e.target.value})}/>
            <input type="text" placeholder="songname" onChange={(e)=>setInfo({...info,songname:e.target.value})}/>
            <button type="submit" >Submit</button>
        </form>

        {songs?songs.map(sg=><p >{sg.song}</p>):<div>wait</div>}
    </div>
  )
}

export default Recommender