import { FormControl, Button } from "@rewind-ui/core";
import {
  Search,
  Check,
  CircleUser,
  BookText,
  ShieldQuestion,
  CircleCheckBig,
  ArrowRight,
} from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import LogoVSC from "../../public/visual-studio-code.png";
import RessourceCard from "../components/Cards/RessourceCard";

export default function Landing() {
  return (
    <Fragment>
      <header>
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <div className="grid items-center justify-items-start gap-8 sm:gap-20 lg:grid-cols-2">
            <div className="flex flex-col">
              <div className="mb-4 flex items-center">
                <div className="mr-4 w-10 [border-top:1px_solid_rgb(0,_0,_0)]"></div>
                <p className="text-sm font-medium sm:text-base">
                  500+ Ressources
                </p>
              </div>
              <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                Premier site de ressources pour développeurs !
              </h1>
              <p className="mb-4 max-w-lg text-sm text-gray-600 sm:text-xl md:mb-6 lg:mb-8">
                RessourceDev est une plateforme de partage de ressources pour
                les développeurs. Trouvez des ressources pour tous les langages
                de programmation et les technologies.
              </p>
              <div className="grid gap-1 sm:gap-1 sm:grid-cols-6">
                <FormControl className="col-span-5">
                  <FormControl.Input placeholder="Rechercher des ressources" />
                </FormControl>
                <Button className="col-span-1">
                  <Search />
                </Button>
              </div>
              <div className="flex justify-between sm:justify-start sm:gap-8 lg:gap-12 mt-5">
                <div className="flex items-center gap-1">
                  <Check />
                  <p className="text-sm">Totalement gratuit</p>
                </div>
                <div className="flex items-center gap-1">
                  <Check />
                  <p className="text-sm">Disponible 24/7</p>
                </div>
                <div className="flex items-center gap-1">
                  <Check />
                  <p className="text-sm">Open Source</p>
                </div>
              </div>
            </div>
            <img
              src={LogoVSC}
              alt=""
              className="lg:inline-block hidden h-auto xl:max-w-md object-cover transform scale-80 rotate-[4deg] xl:translate-x-20"
            />
          </div>
        </div>
      </header>
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold md:text-5xl">
            Les ressources stars du site ! 🌟
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-lg text-center text-gray-500 md:mb-12 lg:mb-16">
            Lorem ipsum dolor sit amet consectetur adipiscing elit ut
            aliquam,purus sit amet luctus magna fringilla urna
          </p>
          <div className="flex flex-wrap gap-5 sm:gap-6 justify-center">
            <RessourceCard
              id={1}
              title="ReactJS"
              image="https://placehold.co/1280x720"
              description="React est une bibliothèque JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d'application web monopage, via la création de composants dépendant d'un état et générant une page (ou portion) HTML à chaque changement d'état."
              categories={["JavaScript", "Frontend"]}
            />
            <RessourceCard
              id={2}
              title="NodeJS"
              image="https://placehold.co/1280x720"
              description="Node.js est une plateforme logicielle libre et événementielle en JavaScript orientée vers les applications réseau qui doivent pouvoir monter en charge. Elle utilise la machine virtuelle V8, la librairie libuv pour sa boucle d'évènements, et implémente sous licence MIT les spécifications CommonJS."
              categories={["JavaScript", "Backend"]}
            />
            <RessourceCard
              id={3}
              title="VueJS"
              image="https://placehold.co/1280x720"
              description="Vue.js est un framework JavaScript open-source utilisé pour construire des interfaces utilisateur et des applications web monopages. Vue a été créé par Evan You après avoir travaillé pour Google en tant qu'ingénieur sur des projets utilisant AngularJS."
              categories={["JavaScript", "Frontend", "JavaScript", "Frontend"]}
            />
          </div>
          <div className="flex justify-center mt-12">
            <Button className="inline-flex gap-3 px-4 py-7 text-lg font-medium text-white bg-black">
              Voir toutes les ressources
              <ArrowRight />
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full bg-blue-200">
        <div className="mx-auto w-full px-5 py-12 md:px-10 md:py-16 lg:py-20">
          <h2 className="mx-auto text-center text-3xl font-extrabold mb-4 md:text-5xl">
            Comment contribuer au projet ?
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-gray-500 md:mb-20">
            Eh oui, vous pouvez contribuer à ce projet en ajoutant des
            ressources pour les autres développeurs.
          </p>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6">
            <div className="flex flex-row items-center gap-6 rounded-[60px] border border-solid bg-gray-100 px-6 py-4 transition hover:bg-black hover:text-white">
              <div className="flex h-20 w-20 flex-none flex-col items-center justify-center rounded-full bg-white">
                <CircleUser className="text-black" />
              </div>
              <div className="flex flex-col items-start gap-2.5">
                <h5 className="text-base font-bold md:text-xl">
                  Créer un compte
                </h5>
                <p className=" text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                  aliquam, purus sit amet dolor sit amet consectetur adipiscing
                </p>
              </div>
            </div>
            {/* Item */}
            <div className="flex flex-row items-center gap-6 rounded-[60px] border border-solid bg-gray-100 px-6 py-4 transition hover:bg-black hover:text-white">
              <div className="flex h-20 w-20 flex-none flex-col items-center justify-center rounded-full bg-white">
                <BookText className="text-black" />
              </div>
              <div className="flex flex-col items-start gap-2.5">
                <h5 className="text-base font-bold md:text-xl">
                  Ajouter votre ressource
                </h5>
                <p className=" text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                  aliquam, purus sit amet dolor sit amet consectetur adipiscing
                </p>
              </div>
            </div>
            {/* Item */}
            <div className="flex flex-row items-center gap-6 rounded-[60px] border border-solid bg-gray-100 px-6 py-4 transition hover:bg-black hover:text-white">
              <div className="flex h-20 w-20 flex-none flex-col items-center justify-center rounded-full bg-white">
                <ShieldQuestion className="text-black" />
              </div>
              <div className="flex flex-col items-start gap-2.5">
                <h5 className="text-base font-bold md:text-xl">
                  Vérification par l'équipe
                </h5>
                <p className=" text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                  aliquam, purus sit amet dolor sit amet consectetur adipiscing
                </p>
              </div>
            </div>
            {/* Item */}
            <div className="flex flex-row items-center gap-6 rounded-[60px] border border-solid bg-gray-100 px-6 py-4 transition hover:bg-black hover:text-white">
              <div className="flex h-20 w-20 flex-none flex-col items-center justify-center rounded-full bg-white">
                <CircleCheckBig className="text-black" />
              </div>
              <div className="flex flex-col items-start gap-2.5">
                <h5 className="text-base font-bold md:text-xl">
                  Et voilà, c'est en ligne !
                </h5>
                <p className=" text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                  aliquam, purus sit amet dolor sit amet consectetur adipiscing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
