'use client';
import React, { useState } from 'react';

const PostTabs = () => {
    const [activeTab, setActiveTab] = useState('all');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="relative z-20">
            <div className="box">
                <nav className="nav__underline px-3.5">
                    <ul className="group flex space-x-4">
                        <li className={activeTab === 'all' ? 'active' : ''}>
                            <a href="#" onClick={() => handleTabClick('all')} aria-expanded={activeTab === 'all'}> All </a>
                        </li>
                        <li className={activeTab === 'memes' ? 'active' : ''}>
                            <a href="#" onClick={() => handleTabClick('memes')} aria-expanded={activeTab === 'memes'}> Memes </a>
                        </li>
                        <li className={activeTab === 'polls' ? 'active' : ''}>
                            <a href="#" onClick={() => handleTabClick('polls')} aria-expanded={activeTab === 'polls'}> Polls </a>
                        </li>
                    </ul>
                </nav>
                <div className="tab-content text-sm">
                    {activeTab === 'all' && (
                        <div>
                            <div className="p-4 space-y-2">
                                <p className="font-normal leading-relaxed"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam</p>
                                <p className="font-normal leading-relaxed"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim laoreet dolore magna aliquam erat volutpat</p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'memes' && (
                        <div>
                            <div className="p-4 space-y-2">
                                <p className="font-normal leading-relaxed"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam</p>
                                <p className="font-normal leading-relaxed"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim laoreet dolore magna aliquam erat volutpat</p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'polls' && (
                        <div>
                            <div className="p-4 space-y-2">
                                <p className="font-normal leading-relaxed"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam</p>
                                <p className="font-normal leading-relaxed"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim laoreet dolore magna aliquam erat volutpat</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostTabs;