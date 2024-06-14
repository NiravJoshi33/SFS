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
        <div>
            <CreatePostModal isOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
    );
};

export default CreatePost;
