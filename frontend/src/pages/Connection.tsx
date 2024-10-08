import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserService from '../services/UserService';
import { Cookies } from 'react-cookie';

const userService = new UserService();

const Login = () => {

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
            const cookies = new Cookies();
            cookies.set('sessionId', res.session.id, { path: '/' });
            window.location.href = '/';
        });
    }

    const handleClassicLogin = (e: any) => {
        e.preventDefault();
        userService.login(e).then((res:any) => {
            const cookies = new Cookies();
            cookies.set('sessionId', res.data.session.id, { path: '/' });
            window.location.href = '/';
        });
    }

    return (
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen max-w-[40rem]">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Connexion</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                        Pas de compte ?
                        <a className="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" href="../examples/html/signup.html">
                            Créez en un ici !
                        </a>
                        </p>
                    </div>
                
                    <div className="mt-5">
                        <div className='flex justify-center'>
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                            />
                        </div>
                        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Oi</div>
                        <form onSubmit={handleClassicLogin}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email</label>
                                    <div className="relative">
                                        <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error" />
                                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                            <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                            </svg>
                                        </div>
                                    </div>
                                
                                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Merci de saisir un email valide.</p>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Mot de passe</label>
                                        <a className="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">Mot de passe oublié ?</a>
                                    </div>
                                    <div className="relative">
                                        <input type="password" id="password" name="password" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" />
                                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                            <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="hidden text-xs text-red-600 mt-2" id="password-error">Nécessiste 8 charactères.</p>
                                </div>
                    
                                <div className="flex items-center">
                                    <div className="flex">
                                        <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                    </div>
                                    <div className="ms-3">
                                        <label htmlFor="remember-me" className="text-sm dark:text-white">Se souvenir de moi</label>
                                    </div>
                                </div>
            
                                <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Connexion</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;