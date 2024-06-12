'use client'
import React from 'react';
import { IonIcon } from '@ionic/react';
import { addCircle, bookmarkOutline, camera, chevronDown, chevronDownOutline, ellipsisHorizontal, flagOutline, heart, notificationsOffCircle, pricetagsOutline, search, shareOutline, stopCircleOutline, timeOutline } from 'ionicons/icons';
import PostCards from '../posts/PostCards';
import PostCardLoader from '../loader/PostCardLoader';
import CreatePost from '../posts/CreatePost';
import IntroCard from './IntroCard';
import Friends from './Friends';
import StickyTabs from './StickyTabs';

const Profile = () => {
    return (
        <main id="site__main" className="relative 2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
            <div className="max-w-[1065px] mx-auto max-lg:-m-2.5">
                <div className="relative bg-white shadow lg:rounded-b-2xl lg:-mt-10 dark:bg-dark2">
                    <div className="relative overflow-hidden w-full lg:h-72 h-48">
                        <img src="assets/images/avatars/bgprofile.jpg" alt="" className="h-full w-full object-cover inset-0" />

                        <div className="w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-20 z-10"></div>

                        <div className="absolute bottom-0 right-0 m-4 z-20">
                            <div className="flex items-center gap-3">
                                <button className="button bg-white/20 text-white flex items-center gap-2 backdrop-blur-small">Crop</button>
                                <button className="button bg-black/10 text-white flex items-center gap-2 backdrop-blur-small">Edit</button>
                            </div>
                        </div>

                    </div>
                    <div className="p-3">
                        <div className="flex flex-col justify-center md:items-center lg:-mt-48 -mt-28">

                            <div className="relative lg:h-48 lg:w-48 w-28 h-28 mb-4 z-10">
                                <div className="relative overflow-hidden rounded-full md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900 shadow">
                                    <img src="assets/images/meme/memeprofile3.png" alt="" className="h-full w-full object-cover inset-0" />
                                </div>
                                <button type="button" className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full sm:flex hidden"> <IonIcon icon={camera} className="text-2xl md hydrated" role="img" aria-label="camera"></IonIcon></button>
                            </div>

                            <h3 className="md:text-3xl text-base font-bold text-black dark:text-white"> Monroe Parker </h3>

                            <p className="mt-2 text-gray-500 dark:text-white/80"> Family , Food , Fashion , Fourever   <a href="#" className="text-blue-500 ml-4 inline-block"> Edit </a></p>

                            <p className="mt-2 max-w-xl text-sm md:font-normal font-light text-center"> I love beauty and emotion. 🥰 I’m passionate about photography and learning. 📚 I explore genres and styles. 🌈 I think photography is storytelling. 😊</p>

                        </div>
                    </div>
                    <StickyTabs />
                </div>

                <div className="flex 2xl:gap-12 gap-10 mt-8 max-lg:flex-col" id="js-oversized">
                    <div className="flex-1 xl:space-y-6 space-y-3">
                        <CreatePost />
                        <PostCards />
                        <PostCardLoader />
                    </div>

                    <div className="lg:w-[400px]">
                        <div className="lg:space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
                            uk-sticky="media: 1024; end: #js-oversized; offset: 80">
                            <IntroCard />
                            <Friends />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;