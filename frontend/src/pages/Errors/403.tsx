import { useNavigate } from "react-router-dom";

export default function Error403() {
  const navigate = useNavigate();

  return (
    <section className="">
      <div className="mx-auto w-full bg-white max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid items-center gap-8 sm:gap-20 lg:grid-cols-2">
          <div>
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">Erreur 403</h1>
            <p className="mb-6 max-w-lg text-sm text-gray-500 sm:text-xl md:mb-10 lg:mb-12">
              Vous n'avez pas l'autorisation d'accéder à cette page. Voici la
              photo d'un chat pour vous remonter le moral.
            </p>
            <a
              onClick={() => navigate("/")}
              className="inline-block items-center rounded-md bg-black px-6 py-3 text-center font-semibold text-white"
            >
              Back Home
            </a>
          </div>
          <div>
            <img
              src="https://loremflickr.com/1000/800"
              alt=""
              className="mx-auto inline-block h-full w-full max-w-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
