import { Button, FormControl } from "@rewind-ui/core";
import { Search } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import RessourceCard from "../components/Cards/RessourceCard";

export default function Ressources() {
  return (
    <Fragment>
      <header>
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          <div className="grid gap-1 sm:gap-1 sm:grid-cols-6">
            <FormControl className="col-span-5">
              <FormControl.Input placeholder="Rechercher des ressources" />
            </FormControl>
            <Button className="col-span-1">
              <Search />
            </Button>
          </div>
          <div className="grid items-center justify-items-start gap-8 sm:gap-10 lg:grid-cols-3 mt-5">
            <RessourceCard
              id={1}
              title="ReactJS"
              image="https://placehold.co/1280x720"
              categories={["JavaScript", "Frontend"]}
            />
            <RessourceCard
              id={2}
              title="NodeJS"
              image="https://placehold.co/1280x720"
              categories={["JavaScript", "Backend"]}
            />
            <RessourceCard
              id={3}
              title="VueJS"
              image="https://placehold.co/1280x720"
              categories={["JavaScript", "Frontend", "JavaScript", "Frontend"]}
            />
          </div>
        </div>
      </header>
    </Fragment>
  );
}
