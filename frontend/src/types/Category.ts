import { Ressource } from './Ressource';

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    ressources: Ressource[];
}