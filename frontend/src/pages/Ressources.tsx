import React, { useState, useEffect } from 'react';
import RessourceCard from '../components/Cards/RessourceCard';
import RessourceModal from '../components/Modal/RessourceModal';
import Button from '../components/Button/Button';
import Loader from '../components/Loader';
import { MagnifyingGlass } from '@phosphor-icons/react';

const Ressources = () => {

    const [selectedCategory, setSelectedCategory] = useState('');
    const [search, setSearch] = useState('');
    const [take, setTake] = useState(10);
    const [skip, setSkip] = useState(0);
    const [show, setShow] = useState(false);
    const [ressources, setRessources] = useState([]);
    const [totalRessources, setTotalRessources] = useState(0);
    const [selectedRessource, setSelectedRessource] = useState(undefined as any | undefined);
    const [categories, setCategories] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(true);

    const fetchRessources = async (urlSearch?: string,urlCategory?: string) => {
        
        setLoading(true);
        setTimeout(async () => {
            try {
                let geturl = `http://localhost:3000/api/ressources?`;
    
                urlSearch ? (geturl += `search=${urlSearch}&`) : search && (geturl += `search=${search}&`);
                urlCategory ? (geturl += `category=${urlCategory}&`) : selectedCategory && (geturl += `category=${selectedCategory}&`);
                take && (geturl += `take=${take}&`);
                skip && (geturl += `skip=${skip}&`);
                
                const response = await fetch(geturl);
                const data = await response.json();
                console.log(data);
                setRessources(data.data);
                setTotalRessources(data.count);
                setLoading(false);
                firstLoad && setFirstLoad(false);
            } catch (error) {
                console.log(error);
            }
        }, 500);
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(firstLoad) {
            const params = new URLSearchParams(window.location.search);
            const urlSearch = params.get('search') || '';
            const urlCategory = params.get('category') || '';

            urlSearch ? setSearch(urlSearch) : setSearch('');
            urlCategory ? setSelectedCategory(urlCategory) : setSelectedCategory('');
            fetchCategories();
            fetchRessources(urlSearch, urlCategory);
        } else {
            fetchRessources();
        }

    }, [selectedCategory, take]);

    const handleSkip = (skip: number) => {
        setSkip(skip - 1 * take);
    }

    return (

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mt-6">Ressources</h2>
            <p className="text-center text-gray-600 dark:text-neutral-400">Découvrez les ressources proposées par le site.</p>
            
            <form onSubmit={(e) => {e.preventDefault();fetchRessources();}}>
                <div className="flex justify-center mt-5 gap-2">
                    <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20 w-1/2">
                        <div className="flex-[1_0_0%] ">
                            <label htmlFor="hs-search-article-1" className="block text-sm text-gray-700 font-medium dark:text-white"><span className="sr-only">Search article</span></label>
                            <input value={search} onChange={(e) => { setSearch(e.target.value)} } name="hs-search-article-1" id="hs-search-article-1" className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search article" />
                        </div>
                        <div className="flex-[0_0_auto]">
                            <button type="submit" className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                <MagnifyingGlass size="20" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="flex justify-center gap-2 mt-4">
                <Button size="sm" color="neutral" onClick={() => setSelectedCategory('')} text="All" active={!selectedCategory}></Button>
                {categories.map((category: any) => (
                    <Button size="sm" key={category.id} color="neutral" onClick={() => setSelectedCategory(category.name)} text={category.name} active={category.name.toLocaleLowerCase() == selectedCategory.toLocaleLowerCase()}></Button>
                ))}
            </div>
            
            <div className='flex flex-wrap justify-center gap-5 mt-6'>
                {loading ? <Loader /> : ressources.map((ressource: any) => (
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                        <RessourceCard ressource={ressource} onClick={() => { setSelectedRessource(ressource); setShow(true); }} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                {Array.from({length: Math.ceil(totalRessources / take)}, (_, i) => (
                    <Button key={i} size="sm" color="neutral" onClick={() => handleSkip(i + 1)} text={i + 1} active={i + 1 == (skip / take) + 1}></Button>
                ))}
            </div>

            {show && selectedRessource && (
                <RessourceModal show={show} handleClose={() => setShow(false)} ressource={selectedRessource} />
            )}
        </div>
    )

}

export default Ressources;