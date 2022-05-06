import React from 'react'
import '../styles/albums.scss'
import Navbar from '../components/Navbar'

const Artisrts = ({ music }) => {

    // music?.artists.items.map((artists) => console.log(artists))
    // music?.artists.items.map((artists) => console.log(artists.data.visuals.avatarImage))
  return (
    <div className='albums'>
            <Navbar />
            <h2 className='text-success  ps-5'>Artists:</h2>
            <div className='container d-flex flex-row flex-wrap'>
                {
                    music?.artists.items.map((artists) => {
                        const img = artists.data.visuals.avatarImage?.sources[0].url
                        const title = artists.data.profile.name
                        const uri = artists.data.uri;
                       
                        return <>

                            <div class="card bg-success my-3 mx-2">
                                <img src={img?img:`banner2.jpeg`} class="card-img-top" alt="..." />
                                <div class="card-body flex ">
                                    <p class="card-text "><b>{title}</b></p>
                                    {/* <p class="card-text "><b>Artist : {artist}</b></p> */}
                                    <a href={uri} target="_blank" rel="noopener noreferrer"><button className="btn btn-dark">Listen</button></a>
                                </div>
                            </div>

                        </>

                    })
                }

            </div>
        </div>
  )
}

export default Artisrts