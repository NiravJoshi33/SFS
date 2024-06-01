import React from 'react';

const Friends = () => {
    return (
        <div className="box p-5 px-6">

        <div className="flex items-ce justify-between text-black dark:text-white">
            <h3 className="font-bold text-lg"> Friends
                <span className="block text-sm text-gray-500 mt-0. font-normal dark:text-white"> 3489 Friends </span>
            </h3>
            <a href="#" className="text-sm text-blue-500">Find Friend</a>
        </div>

        <div className="grid grid-cols-3 gap-2 gap-y-5 text-center text-sm mt-4 mb-2">

            <div>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <img src="assets/images/avatars/avatar-7.jpg" alt="" className="object-cover w-full h-full inset-0" />
                </div>
                <div className="mt-2 line-clamp-1"> Jesse Steeve </div>
            </div>
            <div>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <img src="assets/images/avatars/avatar-2.jpg" alt="" className="object-cover w-full h-full inset-0" />
                </div>
                <div className="mt-2 line-clamp-1"> John Michael </div>
            </div>
            <div>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <img src="assets/images/avatars/avatar-3.jpg" alt="" className="object-cover w-full h-full inset-0" />
                </div>
                <div className="mt-2 line-clamp-1"> Monroe Parker </div>
            </div>
            <div>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <img src="assets/images/avatars/avatar-4.jpg" alt="" className="object-cover w-full h-full inset-0" />
                </div>
                <div className="mt-2 line-clamp-1"> Martin Gray </div>
            </div>
            <div>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <img src="assets/images/avatars/avatar-5.jpg" alt="" className="object-cover w-full h-full inset-0" />
                </div>
                <div className="mt-2 line-clamp-1"> James Lewis </div>
            </div>
            <div>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <img src="assets/images/avatars/avatar-6.jpg" alt="" className="object-cover w-full h-full inset-0" />
                </div>
                <div className="mt-2 line-clamp-1"> Alexa stella </div>
            </div>


        </div>


    </div>
    );
};

export default Friends;