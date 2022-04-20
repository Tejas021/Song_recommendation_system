import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.scss'

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

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
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                        </ul>
                        <div className="dropdown profile ">
                            <button style={{ backgroundColor: "transparent", border: "0.2px solid transparent" }} className="btn btn-success dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i style={{ fontSize: "1.8rem", padding: "2%" }} className="fas fa-user-circle"></i>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" to="/">name</Link></li>
                                <li style={{ cursor: "pointer" }} ><p className="dropdown-item">Logout</p></li>
                            </ul>
                        </div>

                        <form className="me-md-4 mt-md-0 mt-3">
                            <input className="form-control " type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </div>
            </nav>


        </div>
    )
}

export default Navbar