import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = (props) => {

    let navigate = useNavigate();
    const logoutBtn = () => {
        localStorage.removeItem('token')
        navigate('/signup')
        props.showAlert("success", "fa-solid fa-circle-check", "#198754", "you've logout successfully")
    }
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid  " >

                <Link className="navbar-brand  " to="#">NotBOok</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse  " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5 ">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                </div>
                {!localStorage.getItem('token') ? <form className='d-flex'>
                    <Link type="button" to={"/login"} className="btn btn-outline-primary mx-2">Login</Link>
                    <Link type="button" to={"/signup"} className="btn btn-outline-primary mx-3">Sign Up</Link>
                </form> : <button className="btn btn-outline-primary mx-2" onClick={logoutBtn} >Logout</button>}

            </div>
        </nav>
    )
}

export default Navbar
