import { Fragment, useContext, useEffect, useState, ChangeEvent } from "react";
import { z } from "zod";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../components/Modal/PasswordModal";
import Button from "../components/Button/Button";
import UserService from "../services/UserService";
import InputFile from "../components/InputFile";
import Input from "../components/Input";

const userService = new UserService();

// Define a Zod schema for userProfile
const userProfileSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    profile: z.object({
        bio: z.string().nullable().optional().transform((val) => val ?? ""),
        image: z.unknown().optional(),
    }).optional(),
});

const Profile = () => {
    const { user } = useContext(UserContext) as any;
    const { setUser } = useContext(UserContext) as any;
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(user);
    const [show, setShow] = useState(false);
    const [image, setImage] = useState<any>(null);
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
    }};

    const handleSubmit = (e: any) => {
        e.preventDefault();
    
        // Validate the userProfile data
        const result = userProfileSchema.safeParse(userProfile);
        if (!result.success) {
            console.log("Validation errors:", result.error);
            const formattedErrors = result.error.format();
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
        // if image && image size < 10MB
        if (image && image.size < 10000000) {
            formData.append('image', image);
        }
    
        userService.updateProfile(formData).then((res: any) => {
            console.log("Profile updated successfully:", res);
            setUser(res);
        }).catch((error: any) => {
            console.error("Error updating profile:", error);
        });
    }
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen max-w-[40rem]">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <img src={user && user.profile.image} alt="avatar" className="w-32 h-32 object-cover rounded-full mx-auto" />
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
                                            <label className="text-gray-700 dark:text-neutral-300" htmlFor="email">Email</label>
                                        <Input
                                            label="Email"
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={userProfile?.email || ''}
                                            onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                            error={errors.email}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email._errors[0]}</p>}
                                        </Fragment>
                                    )}
                                    </div>
                                    
                                    <div className="flex flex-col items-start">
                                        <label className="text-gray-700 dark:text-neutral-300" htmlFor="bio">Bio</label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            value={userProfile?.profile?.bio || ''}
                                            onChange={(e) => setUserProfile({ ...userProfile, profile: { ...userProfile.profile, bio: e.target.value } })}
                                            className="py-3 px-4 block w-full border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        />
                                        {errors.profile?.bio && <p className="text-red-500 text-sm">{errors.profile.bio._errors[0]}</p>}
                                    </div>

                                    <InputFile
                                        label="Image de profile"
                                        onChange={handleFileChange}
                                        error={errors.profile?.image?._errors[0]}
                                    />

                                    <div className="flex flex-col items-start">
                                        <Button color="neutral" size="sm" text="Changer le mot de passe" onClick={() => { setShow(true) }} />
                                    </div>
                                    
                                    <div className="flex flex-col items-start">
                                        <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Mettre à jour</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <PasswordModal show={show} handleClose={() => setShow(false)} user={userProfile} />
        </div>
    );
};

export default Profile;
