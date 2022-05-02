import React, { useState,useContext } from 'react'
import '../styles/auth.scss'
import { Link } from 'react-router-dom'
import { request } from '../axios'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';

const Signup = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  let navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await request.post('/register', { 'username': username, 'email': email, "password": password })
      console.log(resp.data)
      if (resp.data.user) {
        localStorage.setItem('email',resp.data.user.email)
        localStorage.setItem('password',resp.data.user.password)
        setUser(resp.data)
        navigate("/");
      } else {
        setErr(resp.data)
      }
      setUsername('')
      setEmail('')
      setPassword('')
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="authContainer">
      <div className="logo">
        MUSCIFY
      </div>
      <div className="formContainer">
        <form onSubmit={e => handleSubmit(e)}>
          <h3>Sign Up</h3>
          <input
            type="text" placeholder="username" value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input type="email" placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} value={email}
          />
          <input type="password" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} value={password}
          />
          <button type="submit" className="loginButton">Sign Up</button>
          <span>
            Have an account? &nbsp; &nbsp;<b><Link to="/login">Sign in.</Link></b>
          </span>
        </form>
        {
          err ? <p className='text-danger fs-4'>! {err}</p> : ''
        }
      </div>

    </div>
  )
}

export default Signup