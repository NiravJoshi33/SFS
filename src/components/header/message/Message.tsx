
'use client';
import { useState, useRef, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { chatboxEllipsesOutline, expandOutline, createOutline, searchOutline } from 'ionicons/icons';

const Message = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className='relative'>
      <button type="button" className="sm:p-2 p-1 rounded-full relative sm:bg-secondery dark:text-white" onClick={toggleDropdown}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 max-sm:hidden">
          <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd"></path>
        </svg>
        <IonIcon icon={chatboxEllipsesOutline} className="sm:hidden text-2xl"></IonIcon>
      </button>

      {isDropdownOpen && (
        <div ref={dropdownRef} className="absolute top-full right-0 mt-2 bg-white pr-1.5 rounded-lg drop-shadow-xl dark:bg-slate-700 md:w-[360px] w-screen border2 z-10">
          <div className="flex items-center justify-between gap-2 p-4 pb-1">
            <h3 className="font-bold text-xl">Chats</h3>
            <div className="flex gap-2.5 text-lg text-slate-900 dark:text-white">
              <IonIcon icon={expandOutline}></IonIcon>
              <IonIcon icon={createOutline}></IonIcon>
            </div>
          </div>
          <div className="relative w-full p-2 px-3">
            <input type="text" className="w-full !pl-10 !rounded-lg dark:!bg-white/10" placeholder="Search" />
            <IonIcon icon={searchOutline} className="dark:text-white absolute left-7 -translate-y-1/2 top-1/2"></IonIcon>
          </div>
          <div className="h-80 overflow-y-auto pr-2">
            <div className="p-2 pt-0 pr-1 dark:text-white/80">
              <a href="#" className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-10 h-10 shrink-0">
                  <img src="assets/images/avatars/avatar-2.jpg" alt="" className="object-cover w-full h-full rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="mr-auto text-sm text-black dark:text-white font-medium">Jesse Steeve</div>
                    <div className="text-xs text-gray-500 dark:text-white/80">09:40AM</div>
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full dark:bg-slate-700"></div>
                  </div>
                  <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">Love your photos 😍</div>
                </div>
              </a>
              <a href="#" className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-10 h-10 shrink-0">
                  <img src="assets/images/avatars/avatar-4.jpg" alt="" className="object-cover w-full h-full rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="mr-auto text-sm text-black dark:text-white font-medium">Martin Gray</div>
                    <div className="text-xs text-gray-500 dark:text-white/80">02:40AM</div>
                  </div>
                  <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">Product photographer wanted? 📷</div>
                </div>
              </a>
              <a href="#" className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-10 h-10 shrink-0">
                  <img src="assets/images/avatars/avatar-5.jpg" alt="" className="object-cover w-full h-full rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="mr-auto text-sm text-black dark:text-white font-medium">Jesse Steeve</div>
                    <div className="text-xs text-gray-500 dark:text-white/80">2 days ago</div>
                  </div>
                  <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">Want to buy landscape photo? 🌄</div>
                </div>
              </a>
              <a href="#" className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-10 h-10 shrink-0">
                  <img src="assets/images/avatars/avatar-3.jpg" alt="" className="object-cover w-full h-full rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="mr-auto text-sm text-black dark:text-white font-medium">Monroe Parker</div>
                    <div className="text-xs text-gray-500 dark:text-white/80">4 weeks ago</div>
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full dark:bg-slate-700"></div>
                  </div>
                  <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">I’m glad you like it.😊</div>
                </div>
              </a>
              <a href="#" className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-10 h-10 shrink-0">
                  <img src="assets/images/avatars/avatar-7.jpg" alt="" className="object-cover w-full h-full rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="mr-auto text-sm text-black dark:text-white font-medium">Alex Dolve</div>
                    <div className="text-xs text-gray-500 dark:text-white/80">2 months ago</div>
                  </div>
                  <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">Photo editor needed. Fix photos? 🛠️</div>
                </div>
              </a>
              <a href="#" className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10">
                <div className="relative w-10 h-10 shrink-0">
                  <img src="assets/images/avatars/avatar-4.jpg" alt="" className="object-cover w-full h-full rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="mr-auto text-sm text-black dark:text-white font-medium">Jesse Steeve</div>
                    <div className="text-xs text-gray-500 dark:text-white/80">09:40AM</div>
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full dark:bg-slate-700"></div>
                  </div>
                  <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">Love your photos 😍</div>
                </div>
              </a>
            </div>
          </div>
          <a href="#">
            <div className="text-center py-4 border-t border-slate-100 text-sm font-medium text-blue-600 dark:text-white dark:border-gray-600">
              See all Messages
            </div>
          </a>
          <div className="w-3 h-3 absolute -top-1.5 right-3 bg-white border-l border-t rotate-45 max-md:hidden dark:bg-dark3 dark:border-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default Message;
