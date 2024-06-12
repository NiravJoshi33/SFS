'use client';
import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { ellipsisHorizontal, heart, chatbubbleEllipses, paperPlaneOutline, shareOutline, bookmarkOutline, notificationsOffOutline, flagOutline, stopCircleOutline, chevronDownOutline, cashOutline } from 'ionicons/icons';



const PostCards = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isReactionOpen, setIsReactionOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tipAmount, setTipAmount] = useState('');

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleReaction = () => {
        setIsReactionOpen(!isReactionOpen);
    };


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTipChange = (event) => {
        setTipAmount(event.target.value);
    };

    const handleSendTip = () => {
        // Add logic to send the tip
        console.log('Tip sent:', tipAmount);
        setIsModalOpen(false);
    };

    return (
        <div className="container-fluid mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2 my-5">
                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                    {/* <a href="timeline.html"> */}
                    <img src="/assets/images/meme/memeprofile1.png" alt="" className="w-19 h-10 rounded-full" />
                    {/* </a> */}
                    <div className="flex-1">
                        <a href="timeline.html">
                            <h4 className="text-black dark:text-white">  Choosing Where to Post Your Content </h4>
                        </a>
                        <div className="text-xs text-gray-500 dark:text-white/80"> Drake dislikes posting on Reddit because upvotes have no money value. He loves posting on SFS, where he can earn real money from tips, competitions, and games.</div>
                    </div>
                    <div className="-mr-1 relative">
                        {/* <button type="button" className="button-icon w-8 h-8" onClick={toggleDropdown}>
                            <IonIcon className="text-xl" icon={ellipsisHorizontal}></IonIcon>
                        </button> */}
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
                    <div className="relative w-full h-96 sm:px-4">
                        <img src="/assets/images/meme/meme1.png" alt="" className="sm:rounded-lg w-full h-full object-fill" />
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
                    <button type="button" className="ml-auto">
                    </button>
                    <button type="button" className="button-icon bg-slate-200/70 mr-5" onClick={handleOpenModal}>
                        <IonIcon className="text-xl" icon={cashOutline}></IonIcon>
                    </button>
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white p-4 rounded-md">
                                <h2 className="text-lg font-semibold mb-2">Send a Tip</h2>
                                <input
                                    type="number"
                                    value={tipAmount}
                                    onChange={handleTipChange}
                                    className="border p-2 rounded-md mb-4 w-full"
                                    placeholder="Award 1 TON"
                                />
                                <button
                                    onClick={handleSendTip}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Send
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
                    <div className="flex items-start gap-3 relative">
                        <a href="timeline.html">
                            <img src="/assets/images/meme/memeprofile4.png" alt="" className="w-6 h-6 mt-1 rounded-full" />
                        </a>
                        <div className="flex-1">
                            <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Steeve </a>
                            <p className="mt-0.5">Finally, a platform where my memes can actually earn me some cash! 🔥💸</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 relative">
                        <a href="timeline.html">
                            <img src="/assets/images/avatars/avatar-3.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" />
                        </a>
                        <div className="flex-1">
                            <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Monroe </a>
                            <p className="mt-0.5">Reddit upvotes are cool, but real money from SFS is next level! 🤑</p>
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

            {/* -------------------- ------Second meme----------- -----------------  */}

            <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2 my-5">
                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                    {/* <a href="timeline.html"> */}
                    <img src="/assets/images/meme/memeprofile2.png" alt="" className="w-19 h-10 rounded-full" />
                    {/* </a> */}
                    <div className="flex-1">
                        <a href="timeline.html">
                            <h4 className="text-black dark:text-white">Meme Posting Priorities</h4>
                        </a>
                        <div className="text-xs text-gray-500 dark:text-white/80">In this meme, a person tells their boss that they have started posting memes on SuperFun.Social. The boss asks if they will still come to the office, to which the person gives a hesitant look, implying that their focus has shifted to enjoying and earning from meme posting.</div>
                    </div>
                    <div className="-mr-1 relative">
                        {/* <button type="button" className="button-icon w-8 h-8" onClick={toggleDropdown}>
                            <IonIcon className="text-xl" icon={ellipsisHorizontal}></IonIcon>
                        </button> */}
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
                    <div className="relative w-full h-96 sm:px-4">
                        <img src="/assets/images/meme/meme2.png" alt="" className="sm:rounded-lg w-full h-full object-fill" />
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
                    <button type="button" className=" ml-auto">
                    </button>
                    <button type="button" className="button-icon bg-slate-200/70 mr-5" onClick={handleOpenModal}>
                        <IonIcon className="text-xl" icon={cashOutline}></IonIcon>
                    </button>
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white p-4 rounded-md">
                                <h2 className="text-lg font-semibold mb-2">Send a Tip</h2>
                                <input
                                    type="number"
                                    value={tipAmount}
                                    onChange={handleTipChange}
                                    className="border p-2 rounded-md mb-4 w-full"
                                    placeholder="Award 1 TON"
                                />
                                <button
                                    onClick={handleSendTip}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Send
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
                    <div className="flex items-start gap-3 relative">
                        <a href="timeline.html">
                            <img src="/assets/images/meme/memeprofile4.png" alt="" className="w-6 h-6 mt-1 rounded-full" />
                        </a>
                        <div className="flex-1">
                            <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Steeve </a>
                            <p className="mt-0.5">When your side hustle becomes more exciting than your 9-to-5! 😂 #SuperFunSocial #MemeLife</p>
                        </div>
                    </div>
                    {/* <div className="flex items-start gap-3 relative">
                        <a href="timeline.html">
                            <img src="/assets/images/avatars/avatar-3.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" />
                        </a>
                        <div className="flex-1">
                            <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Monroe </a>
                            <p className="mt-0.5">Reddit upvotes are cool, but real money from SFS is next level! 🤑</p>
                        </div>
                    </div> */}
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




            {/* -------------------- ------third meme----------- -----------------  */}

            <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2 my-5">
                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                    {/* <a href="timeline.html"> */}
                    <img src="/assets/images/meme/memeprofile3.png" alt="" className="w-19 h-10 rounded-full" />
                    {/* </a> */}
                    <div className="flex-1">
                        <a href="timeline.html">
                            <h4 className="text-black dark:text-white">The Future of Earning Through Laughter</h4>
                        </a>
                        <div className="text-xs text-gray-500 dark:text-white/80">This meme depicts a futuristic society where people can earn money sustainably by making others laugh. It imagines a world where humor and creativity are highly valued and financially rewarding.</div>
                    </div>
                    <div className="-mr-1 relative">
                        {/* <button type="button" className="button-icon w-8 h-8" onClick={toggleDropdown}>
                            <IonIcon className="text-xl" icon={ellipsisHorizontal}></IonIcon>
                        </button> */}
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
                    <div className="relative w-full h-96 sm:px-4">
                        <img src="/assets/images/meme/meme3.png" alt="" className="sm:rounded-lg w-full h-full object-fill" />
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
                    <button type="button" className=" ml-auto">
                    </button>
                    <button type="button" className="button-icon bg-slate-200/70 mr-5" onClick={handleOpenModal}>
                        <IonIcon className="text-xl" icon={cashOutline}></IonIcon>
                    </button>
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white p-4 rounded-md">
                                <h2 className="text-lg font-semibold mb-2">Send a Tip</h2>
                                <input
                                    type="number"
                                    value={tipAmount}
                                    onChange={handleTipChange}
                                    className="border p-2 rounded-md mb-4 w-full"
                                    placeholder="Award 1 TON"
                                />
                                <button
                                    onClick={handleSendTip}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Send
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
                    <div className="flex items-start gap-3 relative">
                        <a href="timeline.html">
                            <img src="/assets/images/meme/memeprofile4.png" alt="" className="w-6 h-6 mt-1 rounded-full" />
                        </a>
                        <div className="flex-1">
                            <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Steeve </a>
                            <p className="mt-0.5">Imagine a world where your humor pays the bills! 😂🌐</p>
                        </div>
                    </div>
                    {/* <div className="flex items-start gap-3 relative">
                        <a href="timeline.html">
                            <img src="/assets/images/avatars/avatar-3.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" />
                        </a>
                        <div className="flex-1">
                            <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Monroe </a>
                            <p className="mt-0.5">Reddit upvotes are cool, but real money from SFS is next level! 🤑</p>
                        </div>
                    </div> */}
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


            {/* -------------------- ------fourth meme----------- -----------------  */}

            <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2 my-5">
                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                    {/* <a href="timeline.html"> */}
                    <img src="/assets/images/meme/memeprofile4.png" alt="" className="w-19 h-10 rounded-full" />
                    {/* </a> */}
                    <div className="flex-1">
                        <a href="timeline.html">
                            <h4 className="text-black dark:text-white">The Blockchain Developer's Dilemma</h4>
                        </a>
                        <div className="text-xs text-gray-500 dark:text-white/80"> This meme humorously depicts a blockchain developer's tough choice between using the TON Connect React library or the TON Connect JS SDK. The developer is shown sweating and anxious, unable to decide which button to press.</div>
                    </div>
                    <div className="-mr-1 relative">
                        {/* <button type="button" className="button-icon w-8 h-8" onClick={toggleDropdown}>
                            <IonIcon className="text-xl" icon={ellipsisHorizontal}></IonIcon>
                        </button> */}
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
                    <div className="relative w-full h-96 sm:px-4">
                        <img src="/assets/images/meme/meme4.png" alt="" className="sm:rounded-lg w-full h-full object-fill" />
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
                    <button type="button" className=" ml-auto">
                    </button>
                    <button type="button" className="button-icon bg-slate-200/70 mr-5" onClick={handleOpenModal}>
                        <IonIcon className="text-xl" icon={cashOutline}></IonIcon>
                    </button>
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white p-4 rounded-md">
                                <h2 className="text-lg font-semibold mb-2">Send a Tip</h2>
                                <input
                                    type="number"
                                    value={tipAmount}
                                    onChange={handleTipChange}
                                    className="border p-2 rounded-md mb-4 w-full"
                                    placeholder="Award 1 TON"
                                />
                                <button
                                    onClick={handleSendTip}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Send
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
                    <div className="flex items-start gap-3 relative">
                        <a href="timeline.html">
                            <img src="/assets/images/meme/memeprofile2.png" alt="" className="w-6 h-6 mt-1 rounded-full" />
                        </a>
                        <div className="flex-1">
                            <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Johne </a>
                            <p className="mt-0.5">When both options are great, but you can only choose one! 😅  #DeveloperStruggles</p>
                        </div>
                    </div>
                    {/* <div className="flex items-start gap-3 relative">
                        <a href="timeline.html">
                            <img src="/assets/images/avatars/avatar-3.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" />
                        </a>
                        <div className="flex-1">
                            <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Monroe </a>
                            <p className="mt-0.5">Reddit upvotes are cool, but real money from SFS is next level! 🤑</p>
                        </div>
                    </div> */}
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


            {/* -------------------- ------fifth meme----------- -----------------  */}

            <div className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2 my-5">
                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                    {/* <a href="timeline.html"> */}
                    <img src="/assets/images/meme/memeprofile1.png" alt="" className="w-19 h-10 rounded-full" />
                    {/* </a> */}
                    <div className="flex-1">
                        <a href="timeline.html">
                            <h4 className="text-black dark:text-white">The Secret of Gaming</h4>
                        </a>
                        <div className="text-xs text-gray-500 dark:text-white/80"> This meme contrasts two types of gamers: those who play just for fun and those who know they can earn money by playing. The left side shows a happy gamer enjoying the game, while the right side shows a serious gamer focused on earning money through gaming.</div>
                    </div>
                    <div className="-mr-1 relative">
                        {/* <button type="button" className="button-icon w-8 h-8" onClick={toggleDropdown}>
                            <IonIcon className="text-xl" icon={ellipsisHorizontal}></IonIcon>
                        </button> */}
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
                    <div className="relative w-full h-96 sm:px-4">
                        <img src="/assets/images/meme/meme5.png" alt="" className="sm:rounded-lg w-full h-full object-fill" />
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
                    <button type="button" className=" ml-auto">
                    </button>
                    <button type="button" className="button-icon bg-slate-200/70">
                        <IonIcon className="text-xl" icon={cashOutline}></IonIcon>
                    </button>
                </div>
                <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
                    <div className="flex items-start gap-3 relative">
                        <a href="timeline.html">
                            <img src="/assets/images/meme/memeprofile2.png" alt="" className="w-6 h-6 mt-1 rounded-full" />
                        </a>
                        <div className="flex-1">
                            <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Johne </a>
                            <p className="mt-0.5"> 🎮 💰</p>
                        </div>
                    </div>
                    {/* <div className="flex items-start gap-3 relative">
                        <a href="timeline.html">
                            <img src="/assets/images/avatars/avatar-3.jpg" alt="" className="w-6 h-6 mt-1 rounded-full" />
                        </a>
                        <div className="flex-1">
                            <a href="timeline.html" className="text-black font-medium inline-block dark:text-white"> Monroe </a>
                            <p className="mt-0.5">Reddit upvotes are cool, but real money from SFS is next level! 🤑</p>
                        </div>
                    </div> */}
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




        </div>




    );
};

export default PostCards;
