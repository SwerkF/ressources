import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ThemeSwitch from './ThemeSwitch';
import Button from './Button/Button';
import NavbarLink from './NavbarLink';
import { UserContext } from '../App';

const Navbar = () => {

    const [current, setCurrent] = useState('home');
    
    const { user } = useContext(UserContext) as any;

    useEffect(() => {
        const path = window.location.pathname;
        const currentPath = path.split('/')[1];
        setCurrent(currentPath);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7">
            <nav className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6 md:px-8 mx-auto" aria-label="Global">
                <div className="md:col-span-3">
                
                <a className="flex-none rounded-xl text-xl inline-block text-black dark:text-white font-semibold focus:outline-none focus:opacity-80" href="../templates/creative-agency/index.html" aria-label="Preline">
                    Ressources Dev
                </a>
                
                </div>

                <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
                    
                    <ThemeSwitch />
                    {!user ? (
                        <div className="flex flex-row gap-3">
                            <Link to="/login">        
                                <Button color="primary" size="sm" text="Sign In" />
                            </Link>
                            <Link to="/register">
                                <Button color="secondary" size="sm" text="Sign Up" />
                            </Link>
                        </div>
                    ) : (
                        // display avatar on left, username on right and under username, logout button
                        <div className="flex flex-row items-center gap-3">
                            <Link to="/profile">
                            {(user as any) && (user as any).profile.image ? 
                                <img src={(user as any).profile.image} alt="avatar" className="w-8 h-8 object-cover rounded-full" /> 
                                : 
                                <span className="inline-block size-[38px] bg-gray-100 rounded-full overflow-hidden">
                                    <svg className="size-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white"></rect>
                                        <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor"></path>
                                        <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor"></path>
                                    </svg>
                                </span>
                            }
                            </Link>
                            <div className="flex flex-col items-start">
                                <Link to="/profile">
                                    <span className="text-sm font-semibold dark:text-white">{(user as any).name}</span>
                                </Link>
                                <div className='flex flex-row gap-1'>
                                    {(user as any).role === 'ADMIN' && <Link className="text-sm font-semibold dark:text-white" to="/admin">Admin</Link>}
                                    <button className="text-sm font-semibold dark:text-white" onClick={handleLogout}>Déconnexion</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="md:hidden">
                        <button type="button" className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                        <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                        <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>
                </div>

                <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6">
                    <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
                        <NavbarLink text="Home" link="" current={current == '' ? true : false} onClick={() => setCurrent('')}/>
                        <NavbarLink text="About" link="about" current={current == 'about' ? true : false} onClick={() => setCurrent('about')}/>
                        <NavbarLink text="Ressources" link="ressources" current={current == 'ressources' ? true : false} onClick={() => setCurrent('ressources')}/>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;