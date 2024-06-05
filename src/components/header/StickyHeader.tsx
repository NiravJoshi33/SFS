// 'use client';
import { IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import PostCards from '../posts/PostCards';
import PostCardLoader from '../loader/PostCardLoader';
import PollInputForm from '../poll/PollForm';
import CreatePost from '../posts/CreatePost';
import { imageOutline, videocamOutline } from 'ionicons/icons';

const StickyHeader = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [showPollModal, setShowPollModal] = useState(false);

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const togglePollModal = () => {
    setShowPollModal(!showPollModal);
  };
  return (
    <div className="flex-col container-fluid">

      {/* <div className="flex items-center justify-between mt-3 border-gray-100 px-2 max-lg:flex-col dark:border-slate-700 sticky top-16 border bg-white dark:bg-gray-800 z-50 my-5">
        <nav className="flex gap-0.5 rounded-xl -mb-px text-gray-600 font-medium text-[15px] dark:text-white max-md:w-full max-md:overflow-x-auto">
          {['All', 'Memes', 'Polls'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`inline-block py-3 leading-8 px-3.5 ${activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div> */}
      {
        activeTab === 'All' && <>
          <CreatePost />
          <PostCards />
        </>
      }
      {
        activeTab === 'Memes' && <>
          <CreatePost />
          <PostCards />
        </>
      }
      {
        activeTab === 'Polls' && <>
          <div className="bg-white rounded-xl shadow-sm md:p-4 p-2 space-y-4 text-sm font-medium border1 dark:bg-dark2">
            <div className="flex items-center md:gap-3 gap-1">
              <div
                className="flex-1 bg-slate-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer dark:bg-dark3"
                onClick={togglePollModal}
              >
                <div className="py-2.5 text-center dark:text-white">What do you have in mind?</div>
              </div>
              <div
                className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-pink-100/60 hover:bg-pink-100 dark:bg-white/10 dark:hover:bg-white/20"
                onClick={togglePollModal}
              >
                <IonIcon icon={imageOutline} className="w-8 h-8 stroke-pink-600 fill-pink-200/70" />
              </div>
              <div
                className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-sky-100/60 hover:bg-sky-100 dark:bg-white/10 dark:hover:bg-white/20"
                onClick={togglePollModal}
              >
                <IonIcon icon={videocamOutline} className="w-8 h-8 stroke-sky-600 fill-sky-200/70" />
              </div>
            </div>
          </div>
          <PostCards />
        </>
      }
      {showPollModal && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-10 backdrop-blur-sm" onClick={togglePollModal}></div>
          <PollInputForm togglePollModal={togglePollModal} />
        </div>
      )}
    </div>
  );
};

export default StickyHeader;