import { useState, Fragment, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import About from './pages/About'
import Ressources from './pages/Ressources';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import Login from './pages/Connection';
import Profile from './pages/Profile';

import CreateRessource from './pages/CreateRessource';

const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      fetch('http://localhost:3000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }})
        .then(response => response.json())
        .then((data) => {
          if(data.error) { return localStorage.removeItem('token'); }
          setUser(data);
        })
    }
  }, [])
    

  return (
    <Fragment>
        <Router>
          <UserContext.Provider value={{user, setUser} as any}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/ressources" element={<Ressources />} />
              <Route path="/login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="/create-ressource" element={<CreateRessource />} />
              {user && (user as any).role === 'ADMIN' && <Route path="/admin" element={<div>Admin</div>} />}
            </Routes>
            <Footer />
          </UserContext.Provider>
        </Router>
    </Fragment>
  )
}

export default App

export { UserContext }