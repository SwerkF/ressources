import { useState, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home'
import About from './pages/About'
import Ressources from './pages/Ressources';
import Connection from './pages/Connection';
import Navbar from './components/Navbar'


function App() {

  return (
    <Fragment>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ressources" element={<Ressources />} />
            <Route path="/connection" element={<Connection />} />
          </Routes>
        </Router>
        
    </Fragment>
  )
}

export default App
