'use client';
// import { notificationsData } from '@/lib/utils';
import { notificationsData } from '../../lib/utils';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const RecentList = () => {
    const [items, setItems] = useState(notificationsData);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems((prevItems) => {
                const newItems = [...prevItems];
                const firstItem = newItems.pop();
                newItems.unshift(firstItem);
                return newItems;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full rounded-lg overflow-y-scroll h-80  dark:bg-gray-800">
            {items.map((notification, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-700 my-2 rounded-lg text-center transition-transform transform"
                    style={{
                        animation: `dropExpand 3s ${index * 0.2}s forwards, slideDown 5s ${index * 0.1}s infinite`,
                    }}
                >
                    <a
                        href={notification.href}
                        className={`relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-gray-200 dark:hover:bg-gray-600 ${notification.bgClass}`}
                    >
                        <div className="relative w-10 h-10 shrink-0">
                            <Image
                                src={notification.imgSrc}
                                alt={notification.imgAlt}
                                className="object-cover w-full h-full rounded-full"
                                width={48}
                                height={48}
                            />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-base text-gray-900 dark:text-gray-200">
                                <b className="font-bold mr-1">{notification.message.split(' ')[0]}</b> {notification.message.slice(notification.message.indexOf(' ') + 1)}
                            </p>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notification.time}</div>
                            {notification.button}
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default RecentList;
