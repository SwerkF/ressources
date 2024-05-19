import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeSwitch from './ThemeSwitch';
import Button from './Button/Button';
import NavbarLink from './NavbarLink';

const Navbar = () => {

    const [current, setCurrent] = useState('home');

    useEffect(() => {
        const path = window.location.pathname;
        const currentPath = path.split('/')[1];
        setCurrent(currentPath);
    }, []);

    return (
        <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7">
            <nav className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6 md:px-8 mx-auto" aria-label="Global">
                <div className="md:col-span-3">
                
                <a className="flex-none rounded-xl text-xl inline-block text-white font-semibold focus:outline-none focus:opacity-80" href="../templates/creative-agency/index.html" aria-label="Preline">
                    Ressources Dev
                </a>
                
                </div>

                <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
                    
                    <ThemeSwitch />
                    <Button color="primary" size="sm" text="Sign In" />
                    <Button color="secondary" size="sm" text="Sign Up" />

                    <div className="md:hidden">
                        <button type="button" className="hs-collapse-toggle size-[38px] flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                        <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                        <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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