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
import UserService from './services/UserService';

const UserContext = createContext(null);

const userService = new UserService();

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    userService.getProfile().then((res: any) => {
      setUser(res);
    });
  }, []);
    

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