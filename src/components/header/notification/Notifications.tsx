'use client';
import { useState, useRef, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { notificationsOutline, ellipsisHorizontal, checkmarkCircleOutline, settingsOutline, notificationsOffOutline, addCircleOutline, close } from 'ionicons/icons';
import Image from 'next/image';
import React from 'react';

const Notifications = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const dropdownRef = useRef(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // const menuRef = useRef(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen || isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen, isMenuOpen]);

    return (
        <div className='relative'>
            <button type="button" className="sm:p-2 p-1 rounded-full relative sm:bg-secondery dark:text-white" onClick={toggleDropdown}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 max-sm:hidden">
                    <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                    <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z" clipRule="evenodd" />
                </svg>
                <div className="absolute top-0 right-0 -m-1 bg-red-600 text-white text-xs px-1 rounded-full">6</div>
                <IonIcon icon={notificationsOutline} className="sm:hidden text-2xl" />
            </button>

            {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute top-full right-0 mt-2 bg-white pr-1.5 rounded-lg drop-shadow-xl dark:bg-slate-700 md:w-[365px] w-screen border2 z-10">
                    <div className="flex items-center justify-between gap-2 p-4 pb-2">
                        <h3 className="font-bold text-xl">Notifications</h3>
                        <div className="flex gap-2.5 relative" ref={menuRef}>
                            <button type="button" className="p-1 flex rounded-full focus:bg-secondery dark:text-white" onClick={toggleMenu}>
                                <IonIcon className="text-xl" icon={ellipsisHorizontal}></IonIcon>
                            </button>
                            {isMenuOpen && (
                                <div className="absolute w-[280px] bg-white dark:bg-slate-700 rounded-lg shadow-lg p-2 mt-2">
                                    <nav className="text-sm">
                                        <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-slate-600 rounded">
                                            <IonIcon className="text-xl shrink-0" icon={checkmarkCircleOutline}></IonIcon> Mark all as read
                                        </a>
                                        <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-slate-600 rounded">
                                            <IonIcon className="text-xl shrink-0" icon={settingsOutline}></IonIcon> Notification setting
                                        </a>
                                        <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-slate-600 rounded">
                                            <IonIcon className="text-xl shrink-0" icon={notificationsOffOutline}></IonIcon> Mute Notification
                                        </a>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-sm h-[400px] w-full overflow-y-auto pr-2">
                        <div className="pl-2 p-1 text-sm font-normal dark:text-white">
                            <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10 bg-teal-500/5">
                                <div className="relative w-12 h-12 shrink-0">
                                    <Image src="/assets/images/avatars/avatar-3.jpg" alt="Alexa Gray" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                                </div>
                                <div className="flex-1">
                                    <p><b className="font-bold mr-1">Alexa Gray</b> started following you. Welcome him to your profile. 👋</p>
                                    <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">4 hours ago</div>
                                    <div className="w-2.5 h-2.5 bg-teal-600 rounded-full absolute right-3 top-5"></div>
                                </div>
                            </a>
                            <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10">
                                <div className="relative w-12 h-12 shrink-0">
                                    <Image src="/assets/images/avatars/avatar-7.jpg" alt="Jesse Steeve" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                                </div>
                                <div className="flex-1">
                                    <p><b className="font-bold mr-1">Jesse Steeve</b> mentioned you in a story. Check it out and reply. 📣</p>
                                    <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">8 hours ago</div>
                                </div>
                            </a>
                            <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10">
                                <div className="relative w-12 h-12 shrink-0">
                                    <Image src="/assets/images/avatars/avatar-6.jpg" alt="Alexa Stella" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                                </div>
                                <div className="flex-1">
                                    <p><b className="font-bold mr-1">Alexa Stella</b> commented on your photo “Wow, stunning shot!” 💬</p>
                                    <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">8 hours ago</div>
                                </div>
                            </a>
                            <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10">
                                <div className="relative w-12 h-12 shrink-0">
                                    <Image src="/assets/images/avatars/avatar-2.jpg" alt="John Michael" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                                </div>
                                <div className="flex-1">
                                    <p><b className="font-bold mr-1">John Michael</b> who you might know, is on socialite.</p>
                                    <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">2 hours ago</div>
                                    <button type="button" className="button text-white bg-primary">Follow</button>
                                </div>
                            </a>
                            <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10 bg-teal-500/5">
                                <div className="relative w-12 h-12 shrink-0">
                                    <Image src="/assets/images/avatars/avatar-3.jpg" alt="Sarah Gray" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                                </div>
                                <div className="flex-1">
                                    <p><b className="font-bold mr-1">Sarah Gray</b> sent you a message. He wants to chat with you. 💖</p>
                                    <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">4 hours ago</div>
                                    <div className="w-2.5 h-2.5 bg-teal-600 rounded-full absolute right-3 top-5"></div>
                                </div>
                            </a>
                            <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10">
                                <div className="relative w-12 h-12 shrink-0">
                                    <Image src="/assets/images/avatars/avatar-4.jpg" alt="Jesse Steeve" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                                </div>
                                <div className="flex-1">
                                    <p><b className="font-bold mr-1">Jesse Steeve</b> Sarah tagged you in a photo of your birthday party. 📸</p>
                                    <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">8 hours ago</div>
                                </div>
                            </a>
                            <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10">
                                <div className="relative w-12 h-12 shrink-0">
                                    <Image src="/assets/images/avatars/avatar-2.jpg" alt="Lewis Lewis" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                                </div>
                                <div className="flex-1">
                                    <p><b className="font-bold mr-1">Lewis Lewis</b> mentioned you in a story. Check it out and reply. 📣</p>
                                    <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">8 hours ago</div>
                                </div>
                            </a>
                            <a href="#" className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10">
                                <div className="relative w-12 h-12 shrink-0">
                                    <Image src="/assets/images/avatars/avatar-7.jpg" alt="Martin Gray" className="object-cover w-full h-full rounded-full" width={48} height={48} />
                                </div>
                                <div className="flex-1">
                                    <p><b className="font-bold mr-1">Martin Gray</b> liked your photo of the Eiffel Tower. 😍</p>
                                    <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">8 hours ago</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;
