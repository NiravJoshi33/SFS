'use client';
import React, { useEffect, useState } from 'react';

const DarkModeComponent = () => {
    const [darkmode, setDark] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') setDark(true);
    }, [])

    useEffect(() => {
        if (darkmode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem("theme", 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem("theme", 'light');
        }
    }, [darkmode])

    return (
        <button className='p-4 bg-teal-500 rounded-lg text-white cursor-pointer  dark:bg-red-400' onClick={() => setDark(!darkmode)}> Dark theme</button>
    );
};

export default DarkModeComponent;