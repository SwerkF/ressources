import React, { useState} from 'react';
import { Ressource } from '../types/Ressource';
import RessourceCard from './Cards/RessourceCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import RessourceModal from './Modal/RessourceModal';
import Loader from './Loader';

const LatestRessources = () => {

    const [ressources, setRessources] = useState<Ressource[]>([]);
    const [selectedRessource, setSelectedRessource] = useState(undefined as Ressource | undefined);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);


    React.useEffect(() => {
        const fetchRessources = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/ressources?take=3');
                const data = await response.json();
                console.log(data);
                setLoading(false);
                setRessources(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRessources();
    }, []);

    const handleOpenModal = (ressource: Ressource) => {
        console.log(ressource);
        setSelectedRessource(ressource);
        setShowModal(true);
    }

    return (
        <React.Fragment>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Dernière ressources</h2>
                <div className='flex flex-wrap justify-center gap-5 mt-6'>
                    {loading ? <Loader /> : ressources.map((ressource) => (
                       <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                           <RessourceCard ressource={ressource} onClick={() => {handleOpenModal(ressource)}} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-6">
                    <Link to="/ressources" className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400">
                        Voir plus de ressources
                        <ArrowRight />
                    </Link>
                </div>
            </div>
            {selectedRessource && (
                <RessourceModal show={showModal} handleClose={() => setShowModal(false)} ressource={selectedRessource!} />
            )}
        </React.Fragment>
    );

}

export default LatestRessources;