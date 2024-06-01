'use client';
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { createOutline, helpOutline, pencilOutline } from 'ionicons/icons';

const QuestionForm = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputValue);
    };

    return (
        <div className="flex-col justify-between p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 shrink-0">
                    <img
                        src="assets/images/icons/home.png"
                        alt="User"
                        className="object-cover w-full h-full rounded-full"
                        width={40}
                        height={40}
                    />
                </div>
                <input
                   value={inputValue}
                   onChange={handleChange}
                    type="text"
                    placeholder="What do you want to ask or share?"
                    className="flex-auto p-2 text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-white"
                />
            </div>
            <div className="flex items-center gap-3 justify-around mt-3">
                <button className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                    <IonIcon icon={helpOutline} className="text-xl" />
                    <span className="hidden md:block">Ask</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-green-600 dark:text-white dark:hover:text-green-400">
                    <IonIcon icon={createOutline} className="text-xl" />
                    <span className="hidden md:block">Answer</span>
                </button>
                <button onClick={handleSubmit} className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-red-600 dark:text-white dark:hover:text-red-400">
                    <IonIcon icon={pencilOutline} className="text-xl" />
                    <span className="hidden md:block">Post</span>
                </button>
            </div>
        </div>
    );
};

export default QuestionForm;
