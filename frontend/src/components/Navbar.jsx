import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.scss'
import { request } from '../axios'
import { UserContext } from '../UserContext';

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [info, setInfo] = useState({ name: "", songname: "" })
    const [songs, setSongs] = useState(null)
    const { user, setUser } = useContext(UserContext);

    const submitReq = async (e) => {
        e.preventDefault()
        request.post("/song", info).then(res => res.data).then(res => setSongs(res))
    }

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);

    };

    const logout = () => {
        localStorage.setItem('email', '')
        localStorage.setItem('password', '')
        setUser(null)
    }

    return (
        <div>
            <nav className={isScrolled ? "navbar scrolled navbar-expand-lg navbar-dark " : "navbar navbar-expand-lg navbar-dark "}>
                <div className="container-fluid">
                    <Link className="navbar-brand p-2" to="/">MUSCIFY</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-md-4">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/albums">Albums</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/artists">Artists</Link>
                            </li>
                            <li className="nav-item">

                                <Link className="nav-link active" to="/playlists">Playlists</Link>

                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li> */}
                            {/* <li className="nav-item">
                                <button style={{ background: 'transparent', color: "white" }} type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Soongs
                                </button>
                            </li> */}
                        </ul>
                        <div className="dropdown profile ">
                            <button style={{ backgroundColor: "transparent", border: "0.2px solid transparent" }} className="btn btn-success dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i style={{ fontSize: "1.8rem", padding: "2%" }} className="fas fa-user-circle"></i>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" to="/">name</Link></li>
                                <li style={{ cursor: "pointer" }} onClick={logout} ><p className="dropdown-item">Logout</p></li>
                            </ul>
                        </div>

                        {/* <form className="me-md-4 mt-md-0 mt-3">
                            <input className="form-control " type="search" placeholder="Search" aria-label="Search" />
                        </form> */}
                    </div>
                </div>
            </nav>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div style={{ borderBottom: 'solid #fee600' }} className="modal-header">
                            <h5 className="modal-title text-white" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={e => submitReq(e)}>
                                <input type="text" placeholder="name" className='mx-2' onChange={(e) => setInfo({ ...info, name: e.target.value })} />
                                <input type="text" placeholder="songname" className='mx-2' onChange={(e) => setInfo({ ...info, songname: e.target.value })} /><br />
                                <button type="submit" className='btn btn-warning ms-2 my-3' >Submit</button>
                            </form>

                            {songs ? songs.map(sg => <p >{sg.song}</p>) : <div>wait</div>}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar