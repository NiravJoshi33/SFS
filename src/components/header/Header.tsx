'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DropDown from './search/DropDown';
import Create from './create/Create';
import { TonConnectButton } from '@tonconnect/ui-react';

const Header = ({ isSidebarOpen, toggleSidebar }) => {

    return (
        <header className=" z-[100] h-[--m-top] fixed top-0 left-0 w-full flex items-center bg-color2 backdrop-blur-xl border-b border-slate-200 dark:bg-dark2 dark:border-slate-800 ">
            <div className="flex items-center w-full xl:px-6 px-2 max-lg:gap-10">
                <div className="2xl:w-[--w-side] lg:w-[--w-side-sm]">
                    <div className="flex items-center gap-1">
                        {/* <button
                            onClick={toggleSidebar}
                            className="flex items-center justify-center w-8 h-8 text-xl rounded-full hover:bg-gray-100 xl:hidden dark:hover:bg-slate-600 group"
                        >
                            <IonIcon icon={menuOutline} className={`text-2xl ${isSidebarOpen ? 'hidden' : 'block'}`} />
                            <IonIcon icon={closeOutline} className={`text-2xl ${isSidebarOpen ? 'block' : 'hidden'}`} />
                        </button> */}
                        <div id="logo">
                            <Link href="/">
                                <Image
                                    src="/assets/images/sfslogo/sfslogo.png"
                                    alt="Logo"
                                    width={112}
                                    height={28}
                                    className="w-28 md:block hidden dark:!hidden"
                                />
                                <Image
                                    src="/assets/images/sfslogo/sfslogo.png"
                                    alt="Logo"
                                    width={112}
                                    height={28}
                                    className="dark:md:block hidden"
                                />
                                <Image
                                    src="/assets/images/sfslogo/sfslogo.png"
                                    alt="Logo"
                                    width={80}
                                    height={20}
                                    className="hidden max-md:block w-20 dark:!hidden"
                                />
                                <Image
                                    src="/assets/images/sfslogo/sfslogo.png"
                                    alt="Logo"
                                    width={80}
                                    height={20}
                                    className="hidden dark:max-md:block w-20"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex-1 ">
                    <div className="max-w-[1220px] mx-auto flex items-center">
                        <DropDown />
                        <div className="flex items-center sm:gap-4 gap-2 absolute right-5 top-1/2 -translate-y-1/2 text-black">
                            <button type="button" className="sm:hidden sm:p-2 p-1 rounded-full  sm:bg-secondery dark:text-white">
                                {/* <IonIcon icon={search} className="sm:hidden text-2xl" /> */}
                            </button>
                            <Create />

                            <div>
                                <TonConnectButton></TonConnectButton>
                            </div>

                            {/* <Notifications /> */}
                            {/* <Message /> */}
                            {/* <Profile /> */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
