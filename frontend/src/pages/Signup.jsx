import React from 'react'
import '../styles/auth.scss'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="authContainer">
      <div className="logo">
        MUSCIFY
      </div>
      <div className="formContainer">
        <form>
          <h3>Sign Up</h3>
          <input
            type="text" placeholder="username"
          />
          <input type="email" placeholder="Email"
          />
          <input type="password" placeholder="Password"
          />
          <button type="submit" className="loginButton">Sign Up</button>
          <span>
            Have an account? &nbsp; &nbsp;<b><Link to="/login">Sign in.</Link></b>
          </span>
        </form>
      </div>

    </div>
  )
}

export default Signup