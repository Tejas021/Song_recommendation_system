import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Albums from './pages/Albums'
import Artists from './pages/Artisrts'
import Playlists from './pages/Playlists'
import { useEffect, useState } from "react"
// import Recommender from "./pages/Recommender"
import { UserContext } from './UserContext'

import { request } from './axios'
import { useNavigate } from "react-router-dom";
import axios from "axios"



function App() {

  const [user, setUser] = useState(null)
  const [music, setMusic] = useState(null)

  // const compose = (providers) =>
  //   providers.reduce((Prev, Curr) => ({ children }) => (
  //     <Prev>
  //       <Curr>{children}</Curr>
  //     </Prev>
  //   ));

  // const Provider = compose([
  //   UserContext.provider,
  //   SongContext.provider,

  // ]);

  // let navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
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
    const getSongs = () => {


      const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
          q: '<REQUIRED>',
          type: 'multi',
          // offset: '0',
          limit: '100',
          numberOfTopResults: '50'
        },
        headers: {
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
          'X-RapidAPI-Key': '00534f03e2msh699ff151af7e151p19cf61jsn09e94e390681'
        }
      };

      axios.request(options).then(function (response) {
        setMusic(response.data)
        console.log(music);
      }).catch(function (error) {
        console.error(error);
      });
    }
    getSongs()
  }, [])

  return (
    <div className="App">
     
        <UserContext.Provider value={{ user, setUser }}>
        {/* <SongContext.provider value={{music,setMusic}}> */}
        <Router>
          <Routes>
            <Route path="/register" element={user ? <Home /> : <Signup />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path='/albums' element={user ? <Albums music={music} /> : <Login />} />
            <Route path='/artists' element={user ? <Artists music={music} /> : <Login />} />
            <Route path='/playlists' element={user ? <Playlists music={music} /> : <Login />} />
            {/* <Route path="/songer" element={<Recommender />} />  */}
          </Routes>
        </Router>
      
      </UserContext.Provider>
      {/* </SongContext.provider> */}
    </div>
  );
}

export default App;
