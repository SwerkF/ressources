import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { z } from "zod";
import { RegisterForm } from '../types/RegisterForm';
import Input from '../components/Input';
import Button from '../components/Button/Button';
import { ArrowsClockwise, X, XLogo , GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import RandomAvatar from '../components/Avatar/RandomAvatar';

const userService = new UserService();

const user = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    bio: z.string().optional(),
    interests: z.array(z.string()),
    socials: z.object({
        github: z.string().optional().refine((value) => !value || /^https:\/\/github\.com/.test(value), { message: "Invalid GitHub URL" }),
        linkedin: z.string().optional().refine((value) => !value || /^https:\/\/www\.linkedin\.com/.test(value), { message: "Invalid LinkedIn URL" }),
        x: z.string().optional().refine((value) => !value || /^https:\/\/x\.com/.test(value), { message: "Invalid X URL" }),
        instagram: z.string().optional().refine((value) => !value || /^https:\/\/www\.instagram\.com/.test(value), { message: "Invalid Instagram URL" }),
    }).optional(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});


const interestsList = [
    'Web', 'Mobile', 'DevOps', 'Data', 'IA', 'Cloud', 'Javascript', 'Python', 'Java', 'PHP', 'Ruby', 'C#', 'C++', 'React', 'Angular', 'Vue', 'Node', 'Express', 'Spring', 'Tailwind', 'Bootstrap', 'Material UI', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'
];

const Register = () => {

    const [userForm, setUserForm] = useState<RegisterForm>({
        name: '',
        email: '',
        bio: '',
        avatar: undefined,
        interests: [],
        socials: {
            github: '',
            linkedin: '',
            x: '',
            instagram: '',
        },
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<any>({});
    const [refreshAvatar, setRefreshAvatar] = useState<boolean>(false);
    const [currentColors, setCurrentColors] = useState(['#C271B4', '#C20D90']);
    const [step, setStep] = useState<number>(1);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const navigate = useNavigate();

    useEffect(() => {
        userService.getCookies().then((res: any) => {
            console.log(res);
            if (res) {
                navigate('/');
            }
        });

        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
    }, []);

    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            // valide user
            const parsedUser = user.safeParse(userForm);
            if (!parsedUser.success) {
                console.log(parsedUser.error.errors);
                setErrors(parsedUser.error.errors);
                return;
            }

            user.parse(userForm);
            const res = await userService.register(userForm);
            console.log(res);
            if (res) {
                navigate('/login');
            }
            
        } catch (error: any) {
            console.log(error.errors[0].message);
        }
    }

    const handleSelectInterest = (interest: string) => {
        const interests = userForm.interests;
        if (interests.includes(interest)) {
            const index = interests.indexOf(interest);
            interests.splice(index, 1);
        } else {
            interests.push(interest);
        }
        setUserForm({ ...userForm, interests });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
        handleTryParse(name, value);
    };

    const handleTryParse = (name?:any, value?: any) => {
        try {
           if(name) {
                const parsedUser = user.safeParse({...userForm, [name]: value});
                if (!parsedUser.success) {
                    setErrors(parsedUser.error.errors);
                    console.log(parsedUser.error.errors);
                } else {
                     setErrors({});
                }
           } else {
                let parsedUser = user.parse(userForm);
                if (parsedUser) {
                    setErrors({});
                } else {
                    console.log(parsedUser);
                }
           }
        } catch (error) {
            console.log(error);
        }
    }
    

    const handleChangeSocials = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, socials: { ...userForm.socials, [name]: value } });
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-40 min-h-screen">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Section Login */}
                <div className="lg:w-3/4 p-4 sm:p-7 shadow-md rounded-md">
                    <div className="text-center">
                        <h1 className="block text-6xl font-bold text-gray-800 dark:text-white">Inscription</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                            Vous avez déjà un compte ?
                            <a className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" onClick={() => { navigate('/login') }} >
                                Connectez vous
                            </a>
                        </p>
                    </div>

                    <div className="mt-5">
                        <form onSubmit={handleRegister} className="flex flex-col gap-5">
                            {step === 1 && (
                                <Fragment>
                                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Informations de connexion</h2>
                                    <Input
                                        label="Nom"
                                        type="text"
                                        placeholder="Nom"
                                        name="name"
                                        value={userForm.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                    />
                                    <Input
                                        label="Email"
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={userForm.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                    <Input
                                        label="Mot de passe"
                                        type="password"
                                        placeholder="Mot de passe"
                                        name="password"
                                        value={userForm.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />
                                    <Input
                                        label="Confirmer le mot de passe"
                                        type="password"
                                        placeholder="Confirmer le mot de passe"
                                        name="confirmPassword"
                                        value={userForm.confirmPassword}
                                        onChange={handleChange}
                                        error={errors.confirmPassword}
                                    />
                                        </Fragment>
                                    )}
                            {step === 2 && (
                                <Fragment>
                                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Qui êtes vous ?</h2>
                                    <Input
                                        label="Parlez de vous ici"
                                        type="text"
                                        placeholder="Développeur Fullstack, DevOps, ..."
                                        name="bio"
                                        value={userForm.bio}
                                        onChange={handleChange}
                                        error={errors.bio}
                                    />
                                    <div className="Badges">
                                        <label className="dark:text-white mb-1">
                                            Qu'est ce qui vous intéresse ?
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {interestsList.map((interest, index) => (
                                                <div key={index} onClick={() => handleSelectInterest(interest)} className={`cursor-pointer px-3 flex flex-row transition-all items-center gap-1 py-1 rounded-full text-sm ${userForm.interests.includes(interest) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-neutral-400'} `}>
                                                    {userForm.interests.includes(interest) && <X />} {interest}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            )}
                            {step === 3 && (
                                <Fragment>
                                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Vos réseaux sociaux</h2>
                                    <Input
                                        type="text"
                                        placeholder="https://github.com/username"
                                        name="github"
                                        value={userForm.socials.github}
                                        onChange={handleChangeSocials}
                                        icon={<GithubLogo size={24} />}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="https://www.linkedin.com/in/username"
                                        name="linkedin"
                                        value={userForm.socials.linkedin}
                                        onChange={handleChangeSocials}
                                        icon={<LinkedinLogo size={24} />}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="https://www.instagram.com/username"
                                        name="instagram"
                                        value={userForm.socials.instagram}
                                        onChange={handleChangeSocials}
                                        icon={<InstagramLogo size={24} />}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="https://x.com/username"
                                        name="x"
                                        value={userForm.socials.x}
                                        onChange={handleChangeSocials}
                                        icon={<XLogo  size={24} />}
                                    />
                                </Fragment>
                            )}
                            <div className="mt-4">
                               {step === 1 && (
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            if(errors ||
                                                !userForm.name ||
                                                !userForm.email ||
                                                !userForm.password ||
                                                !userForm.confirmPassword) {
                                                return;
                                            } else {
                                                setStep(2);
                                            }
                                        }}
                                        width="full"
                                    >
                                        Suivant
                                    </Button>
                                )}
                                {step === 2 && (
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className='col-span-1'>
                                            <Button
                                                color="gray"
                                                type="button"
                                                onClick={() => setStep(1)}
                                                width="full"
                                            >
                                                Retour
                                            </Button>
                                        </div>
                                        <div className='col-span-3'>
                                            <Button
                                                type="button"
                                                onClick={() => setStep(3)}
                                                width="full"
                                            >
                                                Suivant
                                            </Button>
                                        </div>
                                            
                                    </div>
                                )}
                                {step === 3 && (
                                    <div className='grid grid-cols-4 gap-4'>
                                        <div className='col-span-1'>
                                            <Button
                                                color="gray"
                                                type="button"
                                                onClick={() => setStep(2)}
                                                width="full"
                                            >
                                                Retour
                                            </Button>
                                        </div>
                                        <div className='col-span-3'>
                                            <Button
                                                type="submit"
                                                width="full"
                                                onClick={handleRegister}
                                            >
                                                S'inscrire
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Section Custom Content */}
                <div className="lg:w-1/2 p-4 sm:p-7 shadow-md rounded-md mt-[100px] min-w-[55%]">
                    <div className='bg-zinc-300 rounded py-10 px-5 h-[100px] border-gray-500'>
                        <div className='absolute cursor-pointer'>
                            <RandomAvatar refresh={refreshAvatar} setUserAvatar={
                                (avatar: any) => {
                                    setUserForm({ ...userForm, avatar });
                                }
                            } currentColors={currentColors} setCurrentColors={setCurrentColors} />
                            <ArrowsClockwise className='absolute bg-zinc-800 p-2 rounded-full top-0 right-0 text-white w-10 h-10 hover:rotate-180 transition-all' onClick={() => { setRefreshAvatar(!refreshAvatar) }}/>
                        </div>
                        <div className='flex flex-col gap-2 mt-40'>
                            {currentColors.map((color, index) => (
                                <div className='flex flex-row gap-2 text-white items-center font-light' key={index}>
                                    <input
                                        type="color"
                                        value={color}
                                        className='w-10 h-7 rounded-full bg-transparent border-none'
                                        onChange={(e: any) => {
                                            // Clone the currentColors array
                                            const newColors = [...currentColors];
                                            newColors[index] = e.target.value;
                                            setCurrentColors(newColors);
                                        }}
                                    />
                                    {color}
                                </div>
                            ))}
                            <p className='text-white text-xs mt-2'>
                                Inscrit depuis
                            </p>
                            <p className='text-white text-xs'>
                                {currentDate.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className='bg-zinc-800 rounded px-5 py-5 min-h-[240px] border-gray-500'>
                        {userForm.name && (
                            <p className='ml-[170px] text-xs text-white font-light'>
                                Hello, mon nom est...
                            </p>
                        )}
                        <div className='ml-[170px] text-3xl text-white font-semibold'>
                            {userForm.name && userForm.name + " ! "}  
                        </div>
                        <div className='ml-[170px] text-white text-lg'>
                            {userForm.bio}
                        </div>
                        {userForm.interests.length > 0 && (
                            <Fragment>
                                <hr className='ml-[170px] border-zinc-600 my-2'/>
                                <div className='flex flex-col gap-2 ml-[170px] mt-2'>
                                    <p className='text-white text-sm font-semibold'>
                                        Mes préférences:
                                    </p>
                                    <div className='text-white text-sm flex flex-row flex-wrap gap-2'>
                                        {userForm.interests.map((interest, index) => (
                                            <div key={index} className="px-3 py-1 rounded-full text-sm bg-blue-600 text-white">
                                                {interest}
                                            </div>
                                        ))}
                                    </div> 
                                </div>
                            </Fragment>
                        )}
                        {userForm.socials.github || userForm.socials.linkedin || userForm.socials.instagram || userForm.socials.x ? (
                            <Fragment>
                                <hr className='ml-[170px] border-zinc-600 my-2'/>
                                <div className='flex flex-row gap-4 flex-wrap ml-[170px] mt-2'>
                                    {userForm.socials.github && /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?github\.com\/[a-zA-Z0-9-_]+$/.test(userForm.socials.github) && (
                                        <a href={userForm.socials.github} target="_blank" className='text-white inline-flex rounded-lg py-1.5 px-1 hover:bg-gray-700 transition-all'>
                                            <GithubLogo size={24} />
                                            {userForm.socials.github.split('/').pop()}
                                        </a>
                                    )}
                                    {userForm.socials.linkedin && /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?linkedin\.com\/in\/[a-zA-Z0-9-_]+$/.test(userForm.socials.linkedin) && (
                                        <a href={userForm.socials.linkedin} target="_blank" className='text-white inline-flex rounded-lg py-1.5 px-1 hover:bg-gray-700 transition-all'>
                                            <LinkedinLogo size={24} />
                                            {userForm.socials.linkedin.split('/').pop()}
                                        </a>
                                    )}
                                    {userForm.socials.instagram && /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?instagram\.com\/[a-zA-Z0-9-_]+$/.test(userForm.socials.instagram) && (
                                        <a href={userForm.socials.instagram} target="_blank" className='text-white inline-flex rounded-lg py-1.5 px-1 hover:bg-gray-700 transition-all'>
                                            <InstagramLogo size={24} />
                                            {userForm.socials.instagram.split('/').pop()}
                                        </a>
                                    )}
                                    {userForm.socials.x && /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?(x|twitter)\.com\/[a-zA-Z0-9-_]+$/.test(userForm.socials.x) && (
                                        <a href={userForm.socials.x} target="_blank" className='text-white inline-flex rounded-lg py-1.5 px-1 hover:bg-gray-700 transition-all'>
                                            <XLogo  size={24} />
                                            {userForm.socials.x.split('/').pop()}
                                        </a>
                                    )}
                                </div>
                                    </Fragment>
                                ) : null}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Register;
