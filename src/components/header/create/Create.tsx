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
        <>
            <button onClick={toggleModal} type="button" className="flex items-center px-4 py-2 rounded-full bg-yellow-500 text-black">
                <span className="mr-1">Create</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                </svg>
            </button>

        </>

    );
};

export default Create;