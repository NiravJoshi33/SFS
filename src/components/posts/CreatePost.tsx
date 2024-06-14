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
        <div>

            <CreatePostModal isOpen={isModalOpen} toggleModal={toggleModal} />
        </div>
    );
};

export default CreatePost;
