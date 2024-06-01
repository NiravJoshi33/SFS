'use client';
import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisHorizontal, heart, chatbubbleEllipses, paperPlaneOutline, shareOutline, bookmarkOutline, notificationsOffOutline, flagOutline, stopCircleOutline, chevronDownOutline } from 'ionicons/icons';

const PostCards = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isReactionOpen, setIsReactionOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleReaction = () => {
        setIsReactionOpen(!isReactionOpen);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2 my-5">
            <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                <a href="timeline.html">
                    <img src="/assets/images/avatars/avatar-3.jpg" alt="" className="w-9 h-9 rounded-full" />
                </a>
                <div className="flex-1">
                    <a href="timeline.html">
                        <h4 className="text-black dark:text-white"> Monroe Parker </h4>
                    </a>
                    <div className="text-xs text-gray-500 dark:text-white/80"> 2 hours ago</div>
                </div>
                <div className="-mr-1 relative">
                    <button type="button" className="button-icon w-8 h-8" onClick={toggleDropdown}>
                        <IonIcon className="text-xl" icon={ellipsisHorizontal}></IonIcon>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-[245px] bg-white rounded-lg shadow-lg z-10 dark:bg-slate-700">
                            <nav>
                                <a href="#">
                                    <IonIcon className="text-xl shrink-0" icon={bookmarkOutline}></IonIcon> Add to favorites
                                </a>
                                <a href="#">
                                    <IonIcon className="text-xl shrink-0" icon={notificationsOffOutline}></IonIcon> Mute Notification
                                </a>
                                <a href="#">
                                    <IonIcon className="text-xl shrink-0" icon={flagOutline}></IonIcon> Report this post
                                </a>
                                <a href="#">
                                    <IonIcon className="text-xl shrink-0" icon={shareOutline}></IonIcon> Share your profile
                                </a>
                                <hr />
                                <a href="#" className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50">
                                    <IonIcon className="text-xl shrink-0" icon={stopCircleOutline}></IonIcon> Unfollow
                                </a>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
            <a href="#preview_modal">
                <div className="relative w-full lg:h-96 h-full sm:px-4">
                    <img src="/assets/images/post/img-2.jpg" alt="" className="sm:rounded-lg w-full h-full object-cover" />
                </div>
            </a>
            <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                <div>
                    <div className="flex items-center gap-2.5">
                        <button type="button" className="button-icon text-red-500 bg-red-100 dark:bg-slate-700" onClick={toggleReaction}>
                            <IonIcon className="text-lg" icon={heart}></IonIcon>
                        </button>
                        <a href="#">1,300</a>
                    </div>
                    {isReactionOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-white p-2 rounded-lg shadow-lg z-10 dark:bg-slate-700 text-2xl">
                            <div className="flex gap-2">
                                <button type="button" className="text-red-600 hover:scale-125 duration-300">👍</button>
                                <button type="button" className="text-red-600 hover:scale-125 duration-300">❤️</button>
                                <button type="button" className="text-red-600 hover:scale-125 duration-300">😂</button>
                                <button type="button" className="text-red-600 hover:scale-125 duration-300">😯</button>
                                <button type="button" className="text-red-600 hover:scale-125 duration-300">😢</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <button type="button" className="button-icon bg-slate-200/70 dark:bg-slate-700">
                        <IonIcon className="text-lg" icon={chatbubbleEllipses}></IonIcon>
                    </button>
                    <span>260</span>
                </div>
                <button type="button" className="button-icon ml-auto">
                    <IonIcon className="text-xl" icon={paperPlaneOutline}></IonIcon>
                </button>
                <button type="button" className="button-icon">
                    <IonIcon className="text-xl" icon={shareOutline}></IonIcon>
                </button>
            </div>
            <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
                <div className="flex items-start gap-3 relative">
                    <a href="timeline.html">
                        <img src="/assets/images/avatars/avatar-2.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" />
                    </a>
                    <div className="flex-1">
                        <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Steeve </a>
                        <p className="mt-0.5">What a beautiful photo! I love it. 😍</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 relative">
                    <a href="timeline.html">
                        <img src="/assets/images/avatars/avatar-3.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" />
                    </a>
                    <div className="flex-1">
                        <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Monroe </a>
                        <p className="mt-0.5">You captured the moment.😎</p>
                    </div>
                </div>
                <button type="button" className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 mt-2">
                    <IonIcon className="ml-auto duration-200 group-aria-expanded:rotate-180" icon={chevronDownOutline}></IonIcon>
                    More Comment
                </button>
            </div>
            <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
                <img src="/assets/images/avatars/avatar-7.jpg" alt="" className="w-6 h-6 rounded-full" />
                <div className="flex-1 relative overflow-hidden h-10">
                    <textarea
                        placeholder="Add Comment...."
                        rows={1}
                        className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
                    ></textarea>
                </div>
                <button type="submit" className="text-sm rounded-full py-1.5 px-3.5 bg-secondery">Reply</button>
            </div>
        </div>
    );
};

export default PostCards;
