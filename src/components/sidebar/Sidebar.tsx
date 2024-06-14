'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FaMobileAlt,
    FaGamepad,
    FaShoppingBag,
    FaChartBar
} from 'react-icons/fa';
import {
    FaMobileAlt as MobileIconSolid,
    FaGamepad as GamepadIconSolid,
    FaShoppingBag as ShoppingBagIconSolid,
    FaChartBar as ChartBarIconSolid
} from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const currentPath = usePathname();
    const [activeHeader, setActiveHeader]=useState(false);

    const isActive = (path) => {
        return currentPath.startsWith(path) && (currentPath.length === path.length || currentPath[path.length] === '/');
    };

    return (
        <>
            {/* Sidebar for larger screens */}
            <div
                id="site__sidebar"
                className={`fixed top-0 left-0 z-[99] pt-[--m-top] overflow-hidden transition-transform duration-500 max-xl:w-full xl:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'max-xl:-translate-x-full'
                    } max-md:hidden`}
            >
                <div className=" bg-sidebar p-2 max-xl:bg-white shadow-sm 2xl:w-72 sm:w-64 w-[80%] h-[calc(100vh-64px)] relative z-30 max-lg:border-r dark:max-xl:!bg-slate-700 dark:border-slate-700">
                    <div className="pr-4 overflow-y-auto h-full">
                        <nav id="side">
                            <ul className="text-sm"> {/* Set the font size to small */}
                                <li className={`  ${isActive('/') ? 'active' : ''} ` }>
                                    <div className=''>
                                    <Link href="/">
                                        <div className="flex items-center">
                                            {/* <img src="assets/images/icons/feed.png" alt="feeds" className="w-6" /> */}
                                            <span>Feed</span>
                                        </div>
                                    </Link>
                                    </div>
                                   
                                </li>
                                <li className={`  ${isActive('/entrypass') ? 'active' : ''}`}>
                                    <Link href="/entrypass">
                                        <div className="flex items-center">
                                            {/* <img src="assets/images/icons/passs.png" alt="feeds" className="w-9" /> */}
                                            <span>Fun Pass</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={`  ${isActive('/questions') ? 'active' : ''}`}>
                                    <Link href="/questions">
                                        <div className="flex items-center">
                                            {/* <img src="assets/images/icons/q&a.png" alt="feeds" className="w-9" /> */}
                                            <span>Q & A</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={`  ${isActive('/superplay') ? 'active' : ''}`}>
                                    <Link href="/superplay">
                                        <div className="flex items-center">
                                            {/* <img src="assets/images/icons/supplay.png" alt="feeds" className="w-9" /> */}
                                            <span>Game</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={`  ${isActive('/contest') ? 'active' : ''}`}>
                                    <Link href="/contest">
                                        <div className="flex items-center">
                                            {/* <img src="assets/images/icons/contest.png" alt="feeds" className="w-9" /> */}
                                            <span>Contest</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={`  ${isActive('/leaderboard') ? 'active' : ''}`}>
                                    <Link href="/leaderboard">
                                        <div className="flex items-center">
                                            {/* <img src="assets/images/icons/leaderboard.png" alt="feeds" className="w-9" /> */}
                                            <span>Leaderboard</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Bottom navigation for mobile */}
            <div className="fixed bottom-0 left-0 z-[99] w-full bg-color2 shadow-md md:hidden">
                <nav id="bottom-nav">
                    <ul className="flex justify-around p-2 text-xs text-white">
                        <li className={`flex flex-col items-center ${currentPath === '/' ? 'text-color1 font-bold' : 'text-white'}`}>
                            <Link href="/">
                                <div className="flex flex-col items-center">
                                    {currentPath === '/' ? (
                                        <MobileIconSolid className="w-6 h-6 text-color1" />
                                    ) : (
                                        <FaMobileAlt className="w-6 h-6 text-white" />
                                    )}
                                    <span>Feed</span>
                                </div>
                            </Link>
                        </li>
                        <li className={`flex flex-col items-center ${currentPath === '/superplay' ? 'text-color1 font-bold' : 'text-white'}`}>
                            <Link href="/superplay">
                                <div className="flex flex-col items-center">
                                    {currentPath === '/superplay' ? (
                                        <GamepadIconSolid className="w-6 h-6 text-color1" />
                                    ) : (
                                        <FaGamepad className="w-6 h-6 text-white" />
                                    )}
                                    <span>Game</span>
                                </div>
                            </Link>
                        </li>
                        <li className={`flex flex-col items-center ${currentPath === '/entrypass' ? 'text-color1 font-bold' : 'text-white'}`}>
                            <Link href="/entrypass">
                                <div className="flex flex-col items-center">
                                    {currentPath === '/entrypass' ? (
                                        <ShoppingBagIconSolid className="w-6 h-6 text-color1" />
                                    ) : (
                                        <FaShoppingBag className="w-6 h-6 text-white" />
                                    )}
                                    <span>Store</span>
                                </div>
                            </Link>
                        </li>
                        <li className={`flex flex-col items-center ${currentPath === '/leaderboard' ? 'text-color1 font-bold' : 'text-white'}`}>
                            <Link href="/leaderboard">
                                <div className="flex flex-col items-center">
                                    {currentPath === '/leaderboard' ? (
                                        <ChartBarIconSolid className="w-6 h-6 text-color1" />
                                    ) : (
                                        <FaChartBar className="w-6 h-6 text-white" />
                                    )}
                                    <span>Leaderboard</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay for the sidebar */}
            <div
                id="site__sidebar__overlay"
                className={`absolute top-0 left-0 z-20 w-screen h-screen xl:hidden backdrop-blur-sm ${isSidebarOpen ? 'block' : 'hidden'
                    }`}
                onClick={toggleSidebar}>
            </div>
        </>
    );
};

export default Sidebar;
