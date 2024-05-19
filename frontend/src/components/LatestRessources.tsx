import React from 'react';
import { Ressource } from '../types/Ressource';
import RessourceCard from './Cards/RessourceCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

const LatestRessources = () => {

    const [ressources, setRessources] = React.useState<Ressource[]>([]);

    React.useEffect(() => {
        /*const fetchRessources = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/ressources');
                const data = await response.json();
                setRessources(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRessources();*/

        const data : Ressource[] = [
            {
                id: 1,
                title: 'Lorem ipsum dolor sit amet',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend mi. Nullam vel tortor vitae lectus dictum ultricies. Nullam quis.',
                image: 'https://via.placeholder.com/150',
                url: 'https://example.com',
                createdAt: '2021-09-01T12:00:00',
                updatedAt: '2021-09-01T12:00:00',
                categories: [
                    {
                        id: 1,
                        name: 'Design',
                        description: 'Category 1 description',
                        created_at: '2021-09-01T12:00:00',
                        updated_at: '2021-09-01T12:00:00',
                        ressources: []
                    },
                    {
                        id: 2,
                        name: 'Code',
                        description: 'Category 2 description',
                        created_at: '2021-09-01T12:00:00',
                        updated_at: '2021-09-01T12:00:00',
                        ressources: []
                    },
                    {
                        id: 3,
                        name: 'Video',
                        description: 'Category 3 description',
                        created_at: '2021-09-01T12:00:00',
                        updated_at: '2021-09-01T12:00:00',
                        ressources: []
                    }
                ],
                content: []
            },
            {
                id: 2,
                title: 'Lorem ipsum dolor sit amet',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend mi. Nullam vel tortor vitae lectus dictum ultricies. Nullam quis.',
                image: 'https://via.placeholder.com/150',
                url: 'https://example.com',
                createdAt: '2021-09-01T12:00:00',
                updatedAt: '2021-09-01T12:00:00',
                categories: [
                    {
                        id: 1,
                        name: 'Design',
                        description: 'Category 1 description',
                        created_at: '2021-09-01T12:00:00',
                        updated_at: '2021-09-01T12:00:00',
                        ressources: []
                    },
                    {
                        id: 2,
                        name: 'Code',
                        description: 'Category 2 description',
                        created_at: '2021-09-01T12:00:00',
                        updated_at: '2021-09-01T12:00:00',
                        ressources: []
                    },
                    {
                        id: 3,
                        name: 'Video',
                        description: 'Category 3 description',
                        created_at: '2021-09-01T12:00:00',
                        updated_at: '2021-09-01T12:00:00',
                        ressources: []
                    }
                ],
                content: []
            },
            {
                id: 3,
                title: 'Lorem ipsum dolor sit amet',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend mi. Nullam vel tortor vitae lectus dictum ultricies. Nullam quis.',
                image: 'https://via.placeholder.com/150',
                url: 'https://example.com',
                createdAt: '2024-05-19T02:43:59',
                updatedAt: '2024-05-19T01:00:00',
                categories: [
                    {
                        id: 1,
                        name: 'Design',
                        description: 'Category 1 description',
                        created_at: '2021-09-01T12:00:00',
                        updated_at: '2021-09-01T12:00:00',
                        ressources: []
                    },
                    {
                        id: 2,
                        name: 'Code',
                        description: 'Category 2 description',
                        created_at: '2021-09-01T12:00:00',
                        updated_at: '2021-09-01T12:00:00',
                        ressources: []
                    },
                    {
                        id: 3,
                        name: 'Video',
                        description: 'Category 3 description',
                        created_at: '2021-09-01T12:00:00',
                        updated_at: '2021-09-01T12:00:00',
                        ressources: []
                    }
                ],
                content: []
            }
        ]
        setRessources(data);

    }, []);

    return (
        <React.Fragment>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Latest Ressources</h2>
                <div className='flex flex-wrap justify-center gap-5 mt-6'>
                    {ressources.map((ressource) => (
                       <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                           <RessourceCard ressource={ressource} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-6">
                    <Link to="/ressources" className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400">
                        View all ressources
                        <ArrowRight />
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );

}

export default LatestRessources;