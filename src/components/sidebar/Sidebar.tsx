'use client';
import React from 'react'; 
import Link from 'next/link';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <>
            <div
                id="site__sidebar"
                className={`fixed top-0 left-0 z-[99] pt-[--m-top] overflow-hidden transition-transform duration-500 max-xl:w-full xl:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'max-xl:-translate-x-full'
                    }`}
            >
                <div className="p-2 max-xl:bg-white shadow-sm 2xl:w-72 sm:w-64 w-[80%] h-[calc(100vh-64px)] relative z-30 max-lg:border-r dark:max-xl:!bg-slate-700 dark:border-slate-700">
                    <div className="pr-4 overflow-y-auto h-full">
                        <nav id="side">
                            <ul>
                                <li className="active">
                                    <Link href="/">
                                        <img src="assets/images/icons/home.png" alt="feeds" className="w-6" />
                                        <span>Fun Feed </span>
                                    </Link>
                                </li>
                                <li className="">
                                    <Link href="/entrypass">
                                        <img src="assets/images/icons/home.png" alt="feeds" className="w-6" />
                                        <span>Entry Pass </span>
                                    </Link>
                                </li>
                                <li className="">
                                    <Link href="/questions">
                                        <img src="assets/images/icons/home.png" alt="feeds" className="w-6" />
                                        <span>Q & A </span>
                                    </Link>
                                </li>
                                <li className="">
                                    <Link href="/superplay">
                                        <img src="assets/images/icons/home.png" alt="feeds" className="w-6" />
                                        <span>Super Play </span>
                                    </Link>
                                </li>
                                <li className="">
                                    <Link href="/contest">
                                        <img src="assets/images/icons/home.png" alt="feeds" className="w-6" />
                                        <span>Contest</span>
                                    </Link>
                                </li>
                                <li className="">
                                    <Link href="/leaderboard">
                                        <img src="assets/images/icons/home.png" alt="feeds" className="w-6" />
                                        <span>Leaderboard</span>
                                    </Link>
                                </li>
                                <li className="">
                                    <Link href="/profile">
                                        <img src="assets/images/icons/home.png" alt="feeds" className="w-6" />
                                        <span>Profile</span>
                                    </Link>
                                </li>

                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
            <div
                id="site__sidebar__overlay"
                className={`absolute top-0 left-0 z-20 w-screen h-screen xl:hidden backdrop-blur-sm ${isSidebarOpen ? 'block' : 'hidden'
                    }`}
                onClick={toggleSidebar}
            ></div>
        </>
    );
};

export default Sidebar;
