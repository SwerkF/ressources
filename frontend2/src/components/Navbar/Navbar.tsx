import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
    console.log(window.location.pathname);
  }, [window.location.pathname]);

  const navigate = useNavigate();

  return (
    <section>
      <nav className="mx-auto h-auto w-full max-w-screen-2xl lg:relative lg:top-0">
        <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
          <a href="#" className="text-2xl font-bold text-black">
            RessoureDev
          </a>
          <div
            className={`mt-14 flex flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0`}
          >
            <a
              className={`rounded-lg lg:px-6 lg:py-4 cursor-pointer hover:font-semibold lg:hover:text-gray-800 ${currentPath === "/" ? "text-gray-800 underline font-bold" : ""}`}
              onClick={() => navigate("/")}
            >
              Home
            </a>
            <a
              className={`rounded-lg lg:px-6 lg:py-4 cursor-pointer hover:font-semibold lg:hover:text-gray-800 ${currentPath === "/ressources" ? "text-gray-800 underline font-bold" : ""}`}
              onClick={() => navigate("/ressources")}
            >
              Ressources
            </a>
            <a
              className={`rounded-lg lg:px-6 lg:py-4 cursor-pointer hover:font-semibold lg:hover:text-gray-800 ${currentPath === "/contact" ? "text-gray-800 underline font-bold" : ""}`}
              onClick={() => navigate("/contact")}
            >
              Contact
            </a>
          </div>
          <div
            className={`flex flex-col space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0`}
          >
            <a
              className="rounded-lg lg:px-6 lg:py-4 lg:hover:text-gray-800"
            >
              Inscription
            </a>
            <a
              className="rounded-lg bg-black px-8 py-4 text-center text-white hover:bg-gray-800"
            >
              Connexion
            </a>
          </div>
        </div>
      </nav>
    </section>
  );
}
