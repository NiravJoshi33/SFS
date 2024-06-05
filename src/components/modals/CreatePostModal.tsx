
// 'use client';`	
import React, { useContext, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline, imageOutline, videocamOutline, happyOutline, locationOutline, ellipsisHorizontal } from 'ionicons/icons';
// import { FarcasterContext } from '@/context/farcaster';


interface CreatePostModalProps {
    isOpen: boolean;
    toggleModal: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, toggleModal }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[99] flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-10 backdrop-blur-sm" onClick={toggleModal}></div>
            <div className="bg-white dark:bg-dark3 p-6 rounded-lg shadow-lg w-[90%] md:w-1/2 lg:w-1/3 z-10">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">Create Post</h2>
                    <button onClick={toggleModal} className="text-xl">
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>
                <textarea
                    placeholder="Create post and mint it as an NFT"
                    className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
                    rows={4}
                />
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-blue-600 bg-blue-100">
                            <IonIcon icon={imageOutline} />
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-green-600 bg-green-100">
                            <IonIcon icon={videocamOutline} />
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-orange-600 bg-orange-100">
                            <IonIcon icon={happyOutline} />
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-red-600 bg-red-100">
                            <IonIcon icon={locationOutline} />
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-gray-600 bg-gray-100">
                            <IonIcon icon={ellipsisHorizontal} />
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="text-gray-600">Everyone</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
