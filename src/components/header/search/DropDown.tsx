'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { trash, searchOutline, close, search } from 'ionicons/icons';

const DropDown = () => {
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
        <div className="flex-1 relative">
        <div className="max-w-[1220px] mx-auto flex items-center">
          <div
            id="search--box"
            className="xl:w-[680px] sm:w-96 sm:relative rounded-xl overflow-hidden z-20 bg-secondery max-md:hidden w-screen left-0 max-sm:fixed max-sm:top-2 dark:!bg-white/5"
          >
            <IonIcon icon={search} className="absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Friends, videos .."
              className="w-full !pl-10 !font-normal !bg-transparent h-12 !text-sm"
              onClick={toggleDropdown}
            />
          </div>
          {isDropdownOpen && (
            <div ref={dropdownRef} className="absolute top-full left-0 mt-2 xl:w-[694px] sm:w-96 bg-white dark:bg-dark3 w-screen p-2 rounded-lg shadow-lg z-10">
              <div className="flex justify-between px-2 py-2.5 text-sm font-medium">
                <div className=" text-black dark:text-white">Recent</div>
                <button type="button" className="text-blue-500">Clear</button>
              </div>
              <nav className="text-sm font-medium text-black dark:text-white">
                <a href="#" className="relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10">
                  <img src="/assets/images/avatars/avatar-2.jpg" className="w-9 h-9 rounded-full" alt="Jesse Steeve" />
                  <div>
                    <div>Jesse Steeve</div>
                    <div className="text-xs text-blue-500 font-medium mt-0.5">Friend</div>
                  </div>
                  <IonIcon icon={close} className="text-base absolute right-3 top-1/2 -translate-y-1/2" />
                </a>
                <a href="#" className="relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10">
                  <img src="/assets/images/avatars/avatar-2.jpg" className="w-9 h-9 rounded-full" alt="Martin Gray" />
                  <div>
                    <div>Martin Gray</div>
                    <div className="text-xs text-blue-500 font-medium mt-0.5">Friend</div>
                  </div>
                  <IonIcon icon={close} className="text-base absolute right-3 top-1/2 -translate-y-1/2" />
                </a>
                <a href="#" className="relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10">
                  <img src="/assets/images/group/group-2.jpg" className="w-9 h-9 rounded-full" alt="Delicious Foods" />
                  <div>
                    <div>Delicious Foods</div>
                    <div className="text-xs text-rose-500 font-medium mt-0.5">Group</div>
                  </div>
                  <IonIcon icon={close} className="text-base absolute right-3 top-1/2 -translate-y-1/2" />
                </a>
                <a href="#" className="relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10">
                  <img src="/assets/images/group/group-1.jpg" className="w-9 h-9 rounded-full" alt="Delicious Foods" />
                  <div>
                    <div>Delicious Foods</div>
                    <div className="text-xs text-yellow-500 font-medium mt-0.5">Page</div>
                  </div>
                  <IonIcon icon={close} className="text-base absolute right-3 top-1/2 -translate-y-1/2" />
                </a>
                <a href="#" className="relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10">
                  <img src="/assets/images/avatars/avatar-6.jpg" className="w-9 h-9 rounded-full" alt="John Welim" />
                  <div>
                    <div>John Welim</div>
                    <div className="text-xs text-blue-500 font-medium mt-0.5">Friend</div>
                  </div>
                  <IonIcon icon={close} className="text-base absolute right-3 top-1/2 -translate-y-1/2" />
                </a>
                <a href="#" className="hidden relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10">
                  <IonIcon icon={searchOutline} className="text-2xl" /> Creative ideas about Business
                </a>
                <a href="#" className="hidden relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10">
                  <IonIcon icon={searchOutline} className="text-2xl" /> 8 Facts About Writing
                </a>
              </nav>
              <hr className="-mx-2 mt-2 hidden" />
              <div className="flex justify-end pr-2 text-sm font-medium text-red-500 hidden">
                <a href="#" className="flex hover:bg-red-50 dark:hover:bg-slate-700 p-1.5 rounded">
                  <IonIcon icon={trash} className="mr-2 text-lg" /> Clear your history
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
};

export default DropDown;
