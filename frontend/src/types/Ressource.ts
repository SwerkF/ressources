import { Category } from './Category';
import { Content } from './Content';

export interface Ressource {
    id?: number;
    title: string;
    description: string;
    image?: any;
    file?: File;
    url: string;
    categories: Category[];
    content: Content[];
    progress: number;
    //ratings: Rating[];
    createdAt: string;
    updatedAt: string;
}
