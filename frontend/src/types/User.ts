import { Profile } from "./Profile";

export interface User {
    id?: number;
    email?: string;
    password?: string;
    role?: string;
    profile: Profile;
    createdAt?: string;
    updatedAt?: string;
}