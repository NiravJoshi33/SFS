'use client';
import React, { useContext, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { imageOutline, videocamOutline } from 'ionicons/icons';
import CreatePostModal from '../modals/CreatePostModal';
// import { FarcasterContext } from '@/context/farcaster';
import { FarcasterContext } from '../../context/farcaster';


const CreatePost = () => {
    const farcasterContext = useContext(FarcasterContext);
    const { toggleModal, isModalOpen } = farcasterContext;

    return (
        <div className="bg-white rounded-xl shadow-sm md:p-4 p-2 space-y-4 text-sm font-medium border1 dark:bg-dark2">
            <div className="flex items-center md:gap-3 gap-1">
                <div
                    className="flex-1 bg-slate-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer dark:bg-dark3"
                    onClick={toggleModal}
                >
                    <div className="py-2.5 text-center dark:text-white">What do you have in mind?</div>
                </div>
                <div
                    className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-pink-100/60 hover:bg-pink-100 dark:bg-white/10 dark:hover:bg-white/20"
                    onClick={toggleModal}
                >
                    <IonIcon icon={imageOutline} className="w-8 h-8 stroke-pink-600 fill-pink-200/70" />
                </div>
                <div
                    className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-sky-100/60 hover:bg-sky-100 dark:bg-white/10 dark:hover:bg-white/20"
                    onClick={toggleModal}
                >
                    <IonIcon icon={videocamOutline} className="w-8 h-8 stroke-sky-600 fill-sky-200/70" />
                </div>
            </div>
            <CreatePostModal isOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
    );
};

export default CreatePost;
