import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { useEffect, useState } from "react"
// import Recommender from "./pages/Recommender"
import { UserContext } from './UserContext'
import {request} from './axios'
import { useNavigate } from "react-router-dom";



function App() {

  const [user, setUser] = useState(null)
  // let navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async ()=>{
    try {
      const email = localStorage.getItem('email')
      const password = localStorage.getItem('password')
      const resp = await request.post('/login', { 'email': email, "password": password })
      console.log(resp.data)
      if (resp.data.user) {
        localStorage.setItem('email', resp.data.user.email)
        localStorage.setItem('password', resp.data.user.password)
        setUser(resp.data)
        // navigate("/");
      } else {
        console.log('error')
      }
    } catch (err) {
      console.log(err)
    }
  }
  verifyUser();
  }, [])

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path="/register" element={user?<Home />:<Signup />} />
            <Route path="/login" element={user?<Home />:<Login />} />
            <Route path="/" element={user?<Home />:<Login />} />
            {/* <Route path="/songer" element={<Recommender />} />  */}
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
