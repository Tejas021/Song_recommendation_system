import React from 'react'
import '../styles/auth.scss'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="authContainer">
            <div className="logo">
                MUSCIFY
            </div>
            <div className="formContainer">
                <form>
                    <h3>Sign In</h3>
                    <input type="email" placeholder="Email"
                    />
                    <input type="password" placeholder="Password"
                    />
                    <button type="submit" className="loginButton">Sign In</button>
                    <span>
                        New to Muscify? &nbsp; &nbsp;<b><Link to="/register">Sign up.</Link></b>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login