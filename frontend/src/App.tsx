import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Error404 from "./pages/Errors/404";
import Ressources from "./pages/Ressources";
import Login from "./pages/Login";
import { GoogleOAuthProvider } from '@react-oauth/google';
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import AppService from "./services/AppService";
import toast, { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile/Profile";
import CreateRessource from "./pages/CreateRessource/CreateRessource";

function Layout() {

  const { isAuthenticated, setIsAuthenticated, setUser } = useAuthStore();

  useEffect(() => {
    if(!isAuthenticated) {
      let session = localStorage.getItem('session');
      if(!session) {
        return;
      }
      try {
        AppService.me(session).then((data) => {
          if(data.error) {
            toast.error("Erreur lors de la récupération de votre session");
            return;
          }

          setIsAuthenticated!(true);
          setUser!(data.data);
          
        });
      } catch (error) {
        toast.error('Erreur lors de la récupération de votre session');
      }
    }
  }, [isAuthenticated])

  const ProtectedRoute = ({ element }: { element: JSX.Element }) => {

  }

  return (
    <div className="flex flex-col min-h-dvh bg-yellow-50">
      <div className="flex-grow">
        <Toaster />
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/ressources" element={<Ressources />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<CreateRessource />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </GoogleOAuthProvider>
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
