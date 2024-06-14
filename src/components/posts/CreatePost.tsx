'use client';
import React, { useContext, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { imageOutline, videocamOutline } from 'ionicons/icons';
import CreatePostModal from '../modals/CreatePostModal';
import { TONContext } from '../../context/tonContext';


const CreatePost = () => {
    const tonContext = useContext(TONContext);
    const { toggleModal, isModalOpen } = tonContext;

    return (
        <div className="bg-white rounded-xl shadow-sm md:p-4 p-2 space-y-4 text-sm font-medium border1 dark:bg-dark2">
            <div className="flex items-center md:gap-3 gap-1">
                <div
                    className="flex-1 bg-slate-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer dark:bg-dark3"
                    onClick={toggleModal}
                >
                    <div className="py-2.5 text-center dark:text-white">Create Feed</div>
                </div>

            </div>
            <CreatePostModal isOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
    );
};

export default CreatePost;
