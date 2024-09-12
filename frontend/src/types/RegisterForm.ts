
export interface RegisterForm {
    name: string;
    email: string;
    password: string;
    bio: string;
    avatar?: SVGAElement;
    socials: {
        x: string;
        instagram: string;
        linkedin: string;
        github: string;
    }
    interests: string[];
    confirmPassword: string;
}