import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { useEffect, useState } from "react"
import Recommender from "./pages/Recommender"



function App() {

  const [new1,setNew]=useState()

  useEffect(()=>{
      fetch("http://localhost:5000/").then(res=>console.log(res))
  },[])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} /> 
          <Route path="/songer" element={<Recommender />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
