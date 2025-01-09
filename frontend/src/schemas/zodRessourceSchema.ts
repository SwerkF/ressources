import { z } from 'zod';

const zodRessourceSchema = z.object({
    id: z.string(),
    name: z.string().min(3, { message: 'Le titre doit contenir au moins 3 caractères' }),
    description: z.string().min(10, { message: 'La description doit contenir au moins 10 caractères' }),
    categories : z.array(z.string()).nonempty().min(1, { message: 'Veuillez sélectionner au moins une catégorie' }),
    content: z.array(z.object({
        type: z.string(),
        html: z.string()
    })).nonempty().min(1, { message: 'Veuillez ajouter au moins une section' }),
});

export default zodRessourceSchema;