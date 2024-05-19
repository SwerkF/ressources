import { Ressource } from './Ressource';

export interface Content {
    id: number;
    type: string;
    value: string;
    ressource: Ressource;
    ressourceId: number;
    createdAt: string;
    updatedAt: string;
}