import React, { useState } from 'react'
import { request } from '../axios'
import "../styles/recommender.scss"
const Recommender = () => {
    const [info, setInfo] = useState({name:"",songname:""})
    const [songs, setSongs] = useState(null)
    const [loading, setLoading] = useState(false)
    const submitReq=async(e)=>{
        e.preventDefault()
        setLoading(true)
        request.post("/song",info).then(res=>res.data).then(res=>{setSongs(res);setLoading(false)})
        
    }


    const innerClick=(sg)=>{
      console.log("hi")
      let a=sg.song.split(" - ")
      setLoading(true)
      request.post("/song",{name:a[1],songname:a[0]}).then(res=>res.data).then(res=>{setSongs(res);setLoading(false)})
      
    }

  return (
    <div className='recommender_container'>
        <h2 className='title'>Find Recommendation</h2>
        <form onSubmit={e=>submitReq(e)}>
         
            <input type="text" placeholder="songname" onChange={(e)=>setInfo({...info,songname:e.target.value})}/>
            <input type="text" placeholder="artist" onChange={(e)=>setInfo({...info,name:e.target.value})}/>
            <button type="submit " >Submit</button>
        </form>

{!loading?

<div className='row  '> 

{songs?songs.map(sg=><div className=' col-md-3 py-2' ><div class="card bg-success my-3 " style={{width: "100%"}}>
<img src="https://images.squarespace-cdn.com/content/v1/5bef06e6fcf7fd06b84df720/1546871259656-4VRXA8OLY0XHMVEKMDOW/Devon%2BSong%2BBanner.jpg?format=2500w" class="card-img-top" alt="..."/>
<div class="card-body flex ">
<p class="card-text "><b>{sg.song}</b></p>
<button onClick={()=>innerClick(sg)} className="btn btn-dark">Listen</button>
</div></div>
</div>):<div>wait</div>}</div>:<div>
<div class="spinner-border text-success" role="status">
  <span class="sr-only">Loading...</span></div>
</div>

}

    </div>
  )
}

export default Recommender

