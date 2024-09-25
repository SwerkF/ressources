import { Interest } from "./Interest";
import { Profile } from "./Profile";

export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    profile: Profile;
    isGoogle?: boolean;
    interests: Interest[];
    x: string;
    instagram: string;
    linkedin: string;
    github: string;
    createdAt?: string;
    updatedAt?: string;
}