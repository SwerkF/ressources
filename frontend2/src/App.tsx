import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Error404 from "./pages/Errors/404";
import Ressources from "./pages/Ressources";
import Login from "./pages/Login";

function Layout() {
  return (
    <div className="flex flex-col min-h-dvh bg-yellow-50">
      <div className="flex-grow">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/ressources" element={<Ressources />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
