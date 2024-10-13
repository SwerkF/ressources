import { Button } from "@rewind-ui/core";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export interface RessourceCardProps {
  id: number;
  title: string;
  image: string;
  description?: string;
  categories: string[];
  author?: {
    name: string;
    avatar: string;
  };
  date?: string;
}

export default function RessourceCard({
  id,
  title,
  image,
  description,
  categories,
  author,
  date,
}: RessourceCardProps) {
  const truncate = (str: string | undefined, n: number) => {
    if (!str) return "";
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div className="mb-12 inline-block border border-solid border-gray-300 md:mb-8 lg:mb-10 max-w-full md:max-w-xs lg:max-w-sm bg-white">
      <img
        src={image}
        alt={title}
        className="max-h-64 object-cover sm:object-fit w-full"
      />
      <div className="px-5 py-8 sm:px-6 h-full">
        <h5 className="mb-3 text-xl font-bold">{title}</h5>
        <p className="flex-col text-gray-500">{truncate(description, 140)}</p>
        <div className="mb-5 mt-6 flex flex-wrap gap-2 md:mb-6 lg:mb-8">
          {categories.slice(0, 2).map((category, index) => (
            <div
              key={index}
              className="rounded-sm bg-gray-300 p-2 text-sm font-semibold uppercase text-gray-700"
            >
              <p>{category}</p>
            </div>
          ))}
          {categories && categories.length > 2 && (
            <div className="rounded-sm bg-gray-300 p-2 text-sm font-semibold uppercase text-gray-700">
              <p>+{categories.length - 3} more</p>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="#"
            className="flex items-center max-w-full gap-2.5 hover:gap-3 text-sm font-bold uppercase text-black transition transform hover:translate-x-1.5"
          >
            <p>VISIT WEBSITE</p>
            <ArrowRight className="inline-block" />
          </a>
          <Button className="inline-flex gap-3 px-4 py-7 text-lg font-medium text-white bg-black">
            View Project
          </Button>
        </div>
      </div>
    </div>
  );
}
