import { z } from 'zod'

export const userPostSchema = (userForm: any) => {
    const schema = z.object({
        name: z.string().nonempty({ message: "Vous devez choisir un nom" }),
        email: z.string().email({ message: "L'email est invalide" }),
        bio: z.string().optional(),
        interests: z.array(z.string()),
        socials: z.object({
            github: z.string().optional().refine((value) => !value || /^https:\/\/github\.com/.test(value), { message: "L'URL Github est invalide" }),
            linkedin: z.string().optional().refine((value) => !value || /^https:\/\/[a-zA-Z]{1,3}\.linkedin\.com/.test(value), { message: "L'URL Linkedin est invalide" }),
            x: z.string().optional().refine((value) => !value || /^https:\/\/x\.com/.test(value), { message: "Invalid X URL" }),
            instagram: z.string().optional().refine((value) => !value || /^https:\/\/www\.instagram\.com/.test(value), { message: "L'URL Instagram est invalide" }),
        }).optional(),
        password: z.string().refine((value) => !value || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/.test(value), { message: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un ou plusieurs caractères spéciaux" }),
        confirmPassword: z.string(),
    });

    return schema.parse(userForm);
}