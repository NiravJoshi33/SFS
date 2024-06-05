'use client'
import { IonIcon } from '@ionic/react';
import { syncOutline } from 'ionicons/icons';
import Image from 'next/image';
import React from 'react';
// import RecentList from '../animation/RecentList';

const RightSIdeBar = () => {
  return (
    <div className="flex-1">
      <div className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
        uk-sticky="media: 1024; end: #js-oversized; offset: 80">

        {/* <div className="box p-5 px-6">
          <div className="flex items-baseline justify-between text-black dark:text-white">
            <h3 className="font-bold text-base"> Recent </h3>
            <a href="#" className="text-sm text-blue-500">See all</a>
          </div>
          <RecentList/>
        </div> */}

        <div className="box p-5 px-6 border1 dark:bg-dark2 ">
          <div className="flex justify-between text-black dark:text-white">
            <h3 className="font-bold text-base"> Top Creators </h3>
            <button type="button"> <IonIcon name={syncOutline} className="text-xl"></IonIcon> </button>
          </div>
          <div className="space-y-4 capitalize text-xs font-normal mt-5 mb-2 text-gray-500 dark:text-white/80">

            <div className="flex items-center gap-3">
              <a href="timeline.html">
                <img src="assets/images/avatars/avatar-7.jpg" alt="" className="bg-gray-200 rounded-full w-10 h-10" />
              </a>
              <div className="flex-1">
                <a href="timeline.html"><h4 className="font-semibold text-sm text-black dark:text-white">  Johnson smith</h4></a>
                <div className="mt-0.5"> Suggested For You </div>
              </div>
              <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
            </div>
            <div className="flex items-center gap-3">
              <a href="timeline.html">
                <img src="assets/images/avatars/avatar-5.jpg" alt="" className="bg-gray-200 rounded-full w-10 h-10" />
              </a>
              <div className="flex-1">
                <a href="timeline.html"><h4 className="font-semibold text-sm text-black dark:text-white"> James Lewis</h4></a>
                <div className="mt-0.5"> Followed by Johnson </div>
              </div>
              <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
            </div>
            <div className="flex items-center gap-3">
              <a href="timeline.html">
                <img src="assets/images/avatars/avatar-2.jpg" alt="" className="bg-gray-200 rounded-full w-10 h-10" />
              </a>
              <div className="flex-1">
                <a href="timeline.html"><h4 className="font-semibold text-sm text-black dark:text-white"> John Michael</h4></a>
                <div className="mt-0.5"> Followed by Monroe  </div>
              </div>
              <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
            </div>
            <div className="flex items-center gap-3">
              <a href="timeline.html">
                <img src="assets/images/avatars/avatar-3.jpg" alt="" className="bg-gray-200 rounded-full w-10 h-10" />
              </a>
              <div className="flex-1">
                <a href="timeline.html"><h4 className="font-semibold text-sm text-black dark:text-white">  Monroe Parker</h4></a>
                <div className="mt-0.5"> Suggested For You </div>
              </div>
              <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
            </div>
            <div className="flex items-center gap-3">
              <a href="timeline.html">
                <img src="assets/images/avatars/avatar-4.jpg" alt="" className="bg-gray-200 rounded-full w-10 h-10" />
              </a>
              <div className="flex-1">
                <a href="timeline.html"><h4 className="font-semibold text-sm text-black dark:text-white">  Martin Gray</h4></a>
                <div className="mt-0.5"> Suggested For You </div>
              </div>
              <button type="button" className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Follow </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default RightSIdeBar;