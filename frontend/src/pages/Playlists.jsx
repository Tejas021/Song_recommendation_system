import React from 'react'
import '../styles/albums.scss'
import Navbar from '../components/Navbar'

const Playlists = ({music}) => {
    //console.log(music?.playlists.items.map(play=>console.log(play.data.images.items[0].sources[0].url)))
  return (
    <div className='albums '>
            <Navbar />
            <h2 className='text-success ps-5'>Playlists :</h2>
            <div className='container d-flex flex-row flex-wrap'>
                {
                    music?.playlists.items.map((playlists) => {
                        const img = playlists.data.images.items[0].sources[0].url
                        const title = playlists.data.name
                        const uri = playlists.data.uri;
                        const owner = playlists.data.owner.name
                        return <>

                            <div class="card bg-success my-3 mx-2">
                                <img src={img?img:`banner2.jpeg`} class="card-img-top" alt="..." />
                                <div class="card-body flex ">
                                    <p class="card-text "><b>{title}</b></p>
                                    <p class="card-text "><b>Owner : {owner}</b></p>
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

export default Playlists