'use client';
// import { FarcasterContext } from '@/context/farcaster';
import { FarcasterContext } from '../../../context/farcaster'
import { IonIcon } from '@ionic/react';
import { addCircleOutline, chevronBack, chevronForward } from 'ionicons/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';

const Create = () => {
    const farcasterContext = useContext(FarcasterContext);
    const { toggleModal } = farcasterContext;
    return (
        <button onClick={toggleModal} type="button" className="sm:p-2 p-1 rounded-full  sm:bg-secondery dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 max-sm:hidden">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
            </svg>
            <IonIcon name={addCircleOutline} className="sm:hidden text-2xl "></IonIcon>
        </button>
    );
};

export default Create;