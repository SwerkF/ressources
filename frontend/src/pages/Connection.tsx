import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { Cookies } from 'react-cookie';
import Input from '../components/Input';
import Button from '../components/Button/Button';
import { toast } from 'react-toastify';

const userService = new UserService();

const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        userService.getCookies().then((res:any) => {
            console.log(res);
            if (res) {
                navigate('/');
            }
        });
    }, []);

    const navigate = useNavigate();
    
    const handleGoogleLogin = (response: any) => {
        console.log(response);
        userService.googleLogin(response).then((res:any) => {
            if (res.error) {
                toast.error(res.error);
            } else {
                const cookies = new Cookies();
                cookies.set('sessionId', res.session.id, { path: '/' });
                window.location.href = '/';
            }
        });
    }

    const handleClassicLogin = (e: any) => {
        e.preventDefault();
        userService.login(e).then((res:any) => {
            if (res.error) {
                toast.error(res.error);
            } else {
                console.log(res);
                const cookies = new Cookies();
                cookies.set('sessionId', res.session.id, { path: '/' });
                window.location.href = '/';
            }
        });
    }

    return (
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-40 min-h-screen">
            <div className="flex flex-col items-center justify-center lg:flex-row gap-8">
                {/* Section Login */}
                <div className="lg:w-1/3 p-4 sm:p-7 shadow-md rounded-md">
                    <div className="text-center">
                        <h1 className="block text-6xl font-bold text-gray-800 dark:text-white">Connexion</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                            Vous n'avez pas de compte ?&nbsp;
                            <a className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" onClick={() => { navigate('/login') }} >
                                Connectez vous
                            </a>
                        </p>
                    </div>
                    <div className="mt-5 w-full flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                        />
                    </div>
                    <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">OU</div>
                    <div className="mt-5">
                        <form onSubmit={handleClassicLogin} className="flex flex-col gap-5">
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                placeholder='Email'
                            />
                            <Input
                                label="Mot de passe"
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                                placeholder='********'
                            />
                            <Button color="primary" type="submit">
                                Connexion
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
                            
    )
}

export default Login;