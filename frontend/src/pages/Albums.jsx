import React, { useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import '../styles/albums.scss'
import { SongContext } from '../SongContext';

const Albums = ({ music }) => {

    // const { songs, setSongs } = useContext(SongContext);
    console.log(music)
    // console.log(music?.albums.items.map(d => console.log(d.data)))

    return (
        <div className='albums'>
            <Navbar />
            <h2 className='text-success ps-5'>Albums :</h2>
            <div className='container d-flex flex-row flex-wrap'>
           
                {
                    music?.albums.items.map((songs) => {
                        const img = songs.data.coverArt.sources[0].url;
                        const title = songs.data.name;
                        const uri = songs.data.uri;
                        const artist = songs.data.artists.items[0].profile.name
                        return <>

                            <div class="card bg-success my-3 mx-2">
                                <img src={img} class="card-img-top" alt="..." />
                                <div class="card-body flex ">
                                    <p class="card-text "><b>{title}</b></p>
                                    <p class="card-text "><b>Artist : {artist}</b></p>
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

export default Albums