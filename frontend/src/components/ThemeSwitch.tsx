import React, { useState, useEffect } from 'react';
import { Moon, Sun } from "@phosphor-icons/react";
import Button from './Button/Button';

const ThemeSwitch = () => {
    const [theme, setTheme] = useState(localStorage.getItem('hs_theme') || 'auto');

    useEffect(() => {
        // set theme "light" or "dark" based on user preference to html element class
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const handleThemeChange = () => {
        if (theme === 'dark') {
            setTheme('light');
            localStorage.setItem('hs_theme', 'light');
            document.documentElement.classList.remove('dark');
        } else {
            setTheme('dark');
            localStorage.setItem('hs_theme', 'dark');
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <React.Fragment>
            <Button color="secondary" size="sm" onClick={handleThemeChange} icon={theme === 'dark' ? <Sun size={16} /> : <Moon size={20} />} />
        </React.Fragment>
    );

};

export default ThemeSwitch;
