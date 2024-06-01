'use client'
import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { search, ellipsisHorizontal, pricetagsOutline, timeOutline, flagOutline, shareOutline, stopCircleOutline, chevronDown } from 'ionicons/icons';
import React from 'react';

const StickyTabs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMoreDropdown = () => setIsMoreDropdownOpen(!isMoreDropdownOpen);

  return (
    <div className="sticky top-16 z-50 bg-white dark:bg-gray-800 shadow rounded-b-2xl border-t border-gray-100 dark:border-slate-700">
      <div className="flex items-center justify-between px-2 py-2 max-lg:flex-col">
        <div className="flex items-center gap-2 text-sm lg:order-2">
          <button type="submit" className="rounded-lg bg-gray-200 flex px-2.5 py-2 dark:bg-dark2">
            <IonIcon icon={search} className="text-xl" />
          </button>
          <div className="relative">
            <button type="submit" className="rounded-lg bg-gray-200 flex px-2.5 py-2 dark:bg-dark3" onClick={toggleDropdown}>
              <IonIcon icon={ellipsisHorizontal} className="text-xl" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10">
                <nav className="flex flex-col">
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <IonIcon icon={pricetagsOutline} className="mr-2 text-xl" />
                    Unfollow
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <IonIcon icon={timeOutline} className="mr-2 text-xl" />
                    Mute story
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <IonIcon icon={flagOutline} className="mr-2 text-xl" />
                    Report
                  </a>
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <IonIcon icon={shareOutline} className="mr-2 text-xl" />
                    Share profile
                  </a>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-50 dark:hover:bg-red-500/50">
                    <IonIcon icon={stopCircleOutline} className="mr-2 text-xl" />
                    Block
                  </a>
                </nav>
              </div>
            )}
          </div>
        </div>
        <nav className="flex gap-0.5 rounded-xl -mb-px text-gray-600 font-medium text-[15px] dark:text-white max-md:w-full max-md:overflow-x-auto">
          <a href="#" className="inline-block py-3 leading-8 px-3.5 border-b-2 border-blue-600 text-blue-600">Timeline</a>
          <a href="#" className="inline-block py-3 leading-8 px-3.5">Friend <span className="text-xs pl-2 font-normal lg:inline-block hidden">2,680</span></a>
          <a href="#" className="inline-block py-3 leading-8 px-3.5">Photo</a>
          <a href="#" className="inline-block py-3 leading-8 px-3.5">Video</a>
          <a href="#" className="inline-block py-3 leading-8 px-3.5">Group</a>
          <div className="relative">
            <a href="#" className="inline-flex items-center gap-2 py-3 leading-8 px-3" onClick={toggleMoreDropdown}>
              More <IonIcon icon={chevronDown}></IonIcon>
            </a>
            {isMoreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-10">
                <nav className="flex flex-col text-[15px]">
                  <a href="#" className="px-4 py-2">Likes</a>
                  <a href="#" className="px-4 py-2">Music</a>
                  <a href="#" className="px-4 py-2">Events</a>
                  <a href="#" className="px-4 py-2">Books</a>
                  <a href="#" className="px-4 py-2">Reviews given</a>
                  <a href="#" className="px-4 py-2">Groups</a>
                  <a href="#" className="px-4 py-2">Manage Sections</a>
                </nav>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default StickyTabs;
