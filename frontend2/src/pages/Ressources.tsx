import { Button, FormControl } from "@rewind-ui/core";
import { Search } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export default function Ressources() {

    return (
        <Fragment>
            <header>
                <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
                    <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                        Ressources
                    </h1>
                    <div className="grid gap-1 sm:gap-1 sm:grid-cols-6">
                        <FormControl className="col-span-5">
                            <FormControl.Input placeholder="Rechercher des ressources" />
                        </FormControl>
                        <Button className="col-span-1">
                            <Search />
                        </Button>
                    </div>
                </div>
             </header>
             

        </Fragment>
    )

}
