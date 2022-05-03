import React, { useState,useContext } from 'react'
import '../styles/auth.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { request } from '../axios'
import { UserContext } from '../UserContext';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await request.post('/login', { 'email': email, "password": password })
            console.log(resp.data)
            if (resp.data.user) {
                localStorage.setItem('email', resp.data.user.email)
                localStorage.setItem('password', resp.data.user.password)
                setUser(resp.data)
                navigate("/");
            } else {
                setErr(resp.data)
            }
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
                    <h3>Sign In</h3>
                    <input type="email" placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)} value={email}
                    />
                    <input type="password" placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)} value={password}
                    />
                    <button type="submit" className="loginButton">Sign In</button>
                    <span>
                        New to Muscify? &nbsp; &nbsp;<b><Link to="/register">Sign up.</Link></b>
                    </span>
                </form>
                {
                    err ? <p className='text-danger fs-4'>! {err}</p> : ''
                }
            </div>
        </div>
    )
}

export default Login