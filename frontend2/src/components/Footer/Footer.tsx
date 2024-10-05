export default function Footer() {
  return (
    <footer className="block bg-black text-white">
      <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
        <div className="sm:flex-row flex justify-between flex-col">
          <h2 className="font-bold text-3xl md:text-5xl w-full max-w-xl">
            Et voilà, le footer !
          </h2>
          <div className="mt-8 md:mt-0">
            <div className="mb-4 flex max-w-72 items-start justify-start"></div>
          </div>
        </div>
        <div className="mb-14 w-full border-b border-white mt-16"></div>
        <div className="md:flex-row flex justify-between sm:items-center sm:flex-col items-start flex-col-reverse">
          <div className="font-semibold mb-4 sm:mb-0 py-1 text-center sm:text-center">
            <a
              href="#"
              className="inline-block font-normal text-gray-400 transition hover:text-blue-400 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              About
            </a>
            <a
              href="#"
              className="inline-block font-normal text-gray-400 transition hover:text-blue-400 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Features
            </a>
            <a
              href="#"
              className="inline-block font-normal text-gray-400 transition hover:text-blue-400 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Works
            </a>
            <a
              href="#"
              className="inline-block font-normal text-gray-400 transition hover:text-blue-400 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Support
            </a>
            <a
              href="#"
              className="inline-block font-normal text-gray-400 transition hover:text-blue-400 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
            >
              Help
            </a>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            Made with ❤️ by Swerk for 🫵
          </p>
        </div>
      </div>
    </footer>
  );
}
