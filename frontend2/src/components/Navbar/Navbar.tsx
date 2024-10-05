import { useState } from "react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOne, setMenuOne] = useState(false);

  return (
    <section>
      <nav className="mx-auto h-auto w-full max-w-screen-2xl lg:relative lg:top-0">
        <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
          <a href="#" className="text-2xl font-bold text-black">
            RessoureDev
          </a>
          <div
            className={`mt-14 flex flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0 ${
              isOpen ? "" : "hidden"
            }`}
          >
            <a
              href="#"
              className="rounded-lg lg:px-6 lg:py-4 lg: lg:hover:text-gray-800"
            >
              About
            </a>
            <a
              href="#"
              className="rounded-lg lg:px-6 lg:py-4 lg: lg:hover:text-gray-800"
            >
              Ressources
            </a>
            <a
              href="#"
              className="rounded-lg lg:px-6 lg:py-4 lg: lg:hover:text-gray-800"
            >
              Contribuer
            </a>
            <a
              href="#"
              className="lg: rounded-lg pb-8 lg:px-6 lg:py-4 lg: lg:hover:text-gray-800"
            >
              FAQs
            </a>
          </div>
          <div
            className={`flex flex-col space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0 ${
              isOpen ? "" : "hidden"
            }`}
          >
            <a
              href="#"
              className="rounded-lg lg:px-6 lg:py-4 lg: lg:hover:text-gray-800"
            >
              Inscription
            </a>
            <a
              className="rounded-lg bg-black px-8 py-4 text-center text-white hover:bg-gray-800"
              href="#"
            >
              Connexion
            </a>
          </div>
          <button
            className="absolute right-5 lg:hidden"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 12H20.25"
                stroke="#160042"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3.75 6H20.25"
                stroke="#160042"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3.75 18H20.25"
                stroke="#160042"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </section>
  );
}
