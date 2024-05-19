import { MagnifyingGlass } from '@phosphor-icons/react';
// icons for Videos, Articles, Courses, CSS Ressources, Javascrpt Ressrouces, Database ressources
import { PlayCircle, Newspaper, Book, DiamondsFour, Code , Database } from '@phosphor-icons/react';
import HomeFilterCard from './HomeCardFilter';

const HomeHero = () => {

    return (
        <div className="relative overflow-hidden">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-neutral-200">
                        Ressources Dev
                    </h1>

                    <p className="mt-3 text-gray-600 dark:text-neutral-400">
                        Ne cherche plus, tu es au bon endroit.
                    </p>

                    <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                        <form>
                            <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20">
                                <div className="flex-[1_0_0%] ">
                                <label htmlFor="hs-search-article-1" className="block text-sm text-gray-700 font-medium dark:text-white"><span className="sr-only">Search article</span></label>
                                <input type="email" name="hs-search-article-1" id="hs-search-article-1" className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search article" />
                                </div>
                                <div className="flex-[0_0_auto] ">
                                <a className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
                                    <MagnifyingGlass size="20" />
                                </a>
                                </div>
                            </div>
                        </form>

                        <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                            <svg className="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                                <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                                <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                            </svg>
                        </div>

                        <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                            <svg className="w-40 h-auto text-cyan-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-20">
                        <HomeFilterCard title="Videos" icon={<PlayCircle size={24} />} />
                        <HomeFilterCard title="Articles" icon={<Newspaper size={24} />} />
                        <HomeFilterCard title="Courses" icon={<Book size={24} />} />
                        <HomeFilterCard title="Design" icon={<DiamondsFour size={24} />} />
                        <HomeFilterCard title="Code" icon={<Code size={24} />} />
                        <HomeFilterCard title="Database Ressources" icon={<Database size={24} />} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHero