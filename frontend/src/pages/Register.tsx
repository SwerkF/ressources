import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { Cookies } from 'react-cookie';
import { set, z } from "zod";
import { RegisterForm } from '../types/RegisterForm';
import Input from '../components/Input';
import Button from '../components/Button/Button';
import Avatar from 'boring-avatars';
import { ArrowsClockwise, X } from '@phosphor-icons/react';
import RandomAvatar from '../components/Avatar/RandomAvatar';

const userService = new UserService();

const user = z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email" }),
    bio: z.string(),
    interests: z.array(z.string()),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
}) as { [key: string]: any };

const interestsList = [
    'Web', 'Mobile', 'DevOps', 'Data', 'IA', 'Cloud', 'Javascript', 'Python', 'Java', 'PHP', 'Ruby', 'C#', 'C++', 'React', 'Angular', 'Vue', 'Node', 'Express', 'Spring', 'Tailwind', 'Bootstrap', 'Material UI', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'
];

const Register = () => {

    const [userForm, setUserForm] = useState<RegisterForm>({
        name: '',
        email: '',
        bio: '',
        interests: [],
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<any>({});
    const [refreshAvatar, setRefreshAvatar] = useState<boolean>(false);
    const [currentColors, setCurrentColors] = useState(['#C271B4', '#C20D90']);

    const navigate = useNavigate();

    useEffect(() => {
        userService.getCookies().then((res: any) => {
            console.log(res);
            if (res) {
                navigate('/');
            }
        });
    }, []);

    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            user.parse(userForm);
            /*const res = await userService.register(user);
            console.log(res);
            if (res) {
                navigate('/login');
            }*/
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

        try {
            const parsedField = user.shape[name].safeParse(value);
            if (parsedField.success) {
                setErrors({ ...errors, [name]: '' });
            } else {
                setErrors({ ...errors, [name]: parsedField.error.errors[0].message });
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                            <Input
                                label="Name"
                                type="text"
                                placeholder="Name"
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
                                label="Password"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={userForm.password}
                                onChange={handleChange}
                                error={errors.password}
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={userForm.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                            />
                            <Input
                                label="Parlez de vous"
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
                            <div className="mt-4">
                                <Button color="primary" type="submit" width="full">
                                    Register
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Section Custom Content */}
                <div className="lg:w-1/2 p-4 sm:p-7 shadow-md rounded-md mt-[100px]">
                    <div className='bg-zinc-300 rounded py-10 px-5 h-[100px] border-gray-500'>
                        <div className='absolute cursor-pointer'>
                            <RandomAvatar refresh={refreshAvatar} currentColors={currentColors} setCurrentColors={setCurrentColors} />
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
                        </div>
                    </div>
                    <div className='bg-zinc-800 rounded px-5 py-5 min-h-[200px] border-gray-500'>
                        <div className='ml-[170px] text-3xl text-white font-semibold'>
                            {userForm.name}
                        </div>
                        <div className='ml-[170px] text-white text-lg'>
                            {userForm.bio}
                        </div>
                        <div className='ml-[170px] text-white text-sm'>
                            {userForm.email}
                        </div>
                        <div className='ml-[170px] text-white text-sm flex flex-row gap-2'>
                            {userForm.interests.map((interest, index) => (
                                <div key={index} className="px-3 py-1 rounded-full text-sm bg-blue-600 text-white">
                                    {interest}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Register;
