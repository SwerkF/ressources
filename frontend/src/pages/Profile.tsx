import { Fragment, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../components/Modal/PasswordModal";
import Button from "../components/Button/Button";
import UserService from "../services/UserService";
import Input from "../components/Input";
import UserAvatar from "../components/Avatar/UserAvatar";
import { toast } from "react-toastify";
import { Interest } from "../types/Interest";

const userService = new UserService();

// Define a Zod schema for userProfile
const userProfileSchema = z.object({
    name: z.string().nonempty({ message: "Vous devez choisir un nom" }),
    email: z.string().email({ message: "L'email est invalide" }),
    interests: z.array(z.string()),
    profile: z.object({
        bio: z.string().optional(),
    }).optional(),
});

const interestsList = [
    'Web', 'Mobile', 'DevOps', 'Data', 'IA', 'Cloud', 'Javascript', 'Python', 'Java', 'PHP', 'Ruby', 'C#', 'C++', 'React', 'Angular', 'Vue', 'Node', 'Express', 'Spring', 'Tailwind', 'Bootstrap', 'Material UI', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'
];

const Profile = () => {
    const { user } = useContext(UserContext) as any;
    const { setUser } = useContext(UserContext) as any;
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(user);
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        console.log(user);
        if (!user) {
            navigate('/login');
        }
        // parse the interests in form of string
        const interests = user.interests.map((interest: Interest) => interest.name);
        userProfileSchema.parse({ ...user, interests });
        
    }, [user]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    
        // Validate the userProfile data
        const result = userProfileSchema.safeParse(userProfile);
        if (!result.success) {
            toast.error("Veuillez vérifier les erreurs dans le formulaire");
            // format errors to be key: string
            const formattedErrors: any = {};
            result.error.errors.map((error: any) => {
                formattedErrors[error.path[0]] = error;
            });
            setErrors(formattedErrors);
            return;
        }
    
        // Clear errors if validation is successful
        setErrors({});
    
        // Create a FormData object
        const formData = new FormData();
        formData.append('name', result.data.name);
        if (result.data.email) {
            formData.append('email', result.data.email);
        }
        if (result.data.profile?.bio) {
            formData.append('bio', result.data.profile.bio);
        }
    
        userService.updateProfile(formData).then((res: any) => {
            toast.success("Profile mis à jour avec succès !");
            setUser(res);
        }).catch(() => {
            toast.error("Erreur lors de la mise à jour du profile");
        });
    }
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen max-w-[40rem]">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        {user && user.profile && user.profile.avatarType === 'boring' ? (
                            <div className="flex flex-col items-center">
                                <UserAvatar 
                                    size="150px"
                                    variant={user.profile.avatarData.variant}
                                    name={user.profile.avatarData.name}
                                    colors={user.profile.avatarData.colors}
                                />  
                            </div>
                        ) : (
                            <img src={user?.profile?.avatarData.url} alt="avatar" className="w-20 h-20 object-cover rounded-full" />
                        )}
                        <h1 className="block text-2xl mt-3 font-bold text-gray-800 dark:text-white">Profile</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                            Bienvenue, {user && user.name} !
                        </p>
                        {user && (
                            <form className="mt-5" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6 text-white">
                                    
                                    <Input
                                        label="Name"
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={userProfile?.name || ''}
                                        onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                                        error={errors.name}
                                    />
                                
                                    <div className="flex flex-col items-start">
                                    {userProfile.isGoogle ? (
                                        <Fragment>
                                            <label className="text-gray-700 dark:text-neutral-300" htmlFor="email">Email <span className="text-xs text-neutral-500">Vous ne pouvez pas modifier le mail d'un compte Google.</span></label>
                                            <div className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 text-left">{userProfile.email}</div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <Input
                                                label="Email"
                                                type="email"
                                                placeholder="Email"
                                                name="email"
                                                value={userProfile?.email || ''}
                                                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                                error={errors.email}
                                            />
                                        </Fragment>
                                    )}
                                    </div>
                                    
                                    <div className="flex flex-col items-start">
                                        <label className="text-gray-700 dark:text-white" htmlFor="bio">Bio</label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            value={userProfile?.profile?.bio || ''}
                                            onChange={(e) => setUserProfile({ ...userProfile, profile: { ...userProfile.profile, bio: e.target.value } })}
                                            className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        />
                                        {errors.profile?.bio && <p className="text-red-500 text-sm">{errors.profile.bio._errors[0]}</p>}
                                    </div>

                                    <div className="flex flex-col items-start">
                                        <label className="text-gray-700 dark:text-white" htmlFor="interests">Mes préférences:</label>
                                        <div className='text-white text-sm flex flex-row flex-wrap gap-2'>
                                            {userProfile.interests.map((interest:Interest, index:number) => (
                                                <div key={index} className={`cursor-pointer px-3 flex flex-row transition-all items-center gap-1 py-1 rounded-full text-sm ${userProfileSchema.interests.includes(interest) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-neutral-400'} `}>
                                                    {interest.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>



                                    {/*
                                        <div className="flex flex-col items-start">
                                            <Button color="neutral" size="sm" onClick={() => { setShow(true) }}>
                                                Changer mot de passe
                                            </Button>
                                        </div>
                                    */}
                                    
                                    <div className="flex flex-col items-start">
                                        <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Mettre à jour</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            {/*  <PasswordModal show={show} handleClose={() => setShow(false)} user={userProfile} />*/}
        </div>
    );
};

export default Profile;
