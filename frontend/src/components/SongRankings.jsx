import React, { useEffect ,useState} from 'react'
import "../styles/songtable.scss"
import {request} from "../axios"
const SongRankings = () => {
const [songs, setSongs] = useState([])
    useEffect(() => {
      const getSongs=async()=>{
        request.get("/popular-songs").then(res=>setSongs(res.data))
      }
    getSongs()
      
    }, [])
    


    

  return (
    <div className=' table-container'>
      <h2>Popular Songs</h2>
     
<div class="table-body">
<table class="mt-5 text-success table table-dark">
  <thead>
    <tr>
      <th scope="col">Rank</th>
      <th scope="col">Song</th>
      <th scope="col">Score</th>
      
    </tr>
  </thead>
  <tbody>
   
    {
        songs.map(song=><tr>
          <th scope="row" className='text-light'>{song.Rank}</th>
          <td className='text-light'>{song.song}</td>
          <td>{song.score}</td>
          
        </tr>)
      
      }
  
  </tbody>
</table>
</div>


    </div>
  )
}

export default SongRankings