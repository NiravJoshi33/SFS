import React from 'react';

const IntroCard = () => {
    return (
        <div className="box p-5 px-6">

            <div className="flex items-ce justify-between text-black dark:text-white">
                <h3 className="font-bold text-lg"> Intro   </h3>
                <a href="#" className="text-sm text-blue-500">Edit</a>
            </div>

            <ul className="text-gray-700 space-y-4 mt-4 text-sm dark:text-white/80">

                <li className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <div>  Live In <span className="font-semibold text-black dark:text-white"> Cairo , Eygept  </span> </div>
                </li>
                <li className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                    <div>  Studied at <span className="font-semibold text-black dark:text-white"> University of Turkey  </span> </div>
                </li>
                <li className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>

                    <div>  Works at <span className="font-semibold text-black dark:text-white">  Envanto Martket </span> </div>
                </li>
                <li className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <div> In <span className="font-semibold text-black dark:text-white"> Relationship  </span></div>
                </li>
                <li className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <div>  Flowwed By <span className="font-semibold text-black dark:text-white"> 3,240 People </span> </div>
                </li>

            </ul>

            <div className="flex flex-wrap gap-1 text-sm mt-4 font-semibold capitalize">
                <div className="inline-flex items-center gap-2 py-0.5 px-2.5 border shadow rounded-full border-gray-100">
                    Shoping
                </div>
                <div className="inline-flex items-center gap-2 py-0.5 px-2.5 border shadow rounded-full border-gray-100">
                    code
                </div>
                <div className="inline-flex items-center gap-2 py-0.5 px-2.5 border shadow rounded-full border-gray-100">
                    art
                </div>
                <div className="inline-flex items-center gap-2 py-0.5 px-2.5 border shadow rounded-full border-gray-100">
                    design
                </div>
            </div>

            <div className="grid grid-cols-2 gap-1 text-center text-sm mt-4 mb-2 rounded-lg overflow-hidden">

                <div className="relative w-full aspect-[4/3]">
                    <img src="assets/images/avatars/avatar-5.jpg" alt="" className="object-cover w-full h-full inset-0" />
                </div>
                <div className="relative w-full aspect-[4/3]">
                    <img src="assets/images/avatars/avatar-7.jpg" alt="" className="object-cover w-full h-full inset-0" />
                </div>
                <div className="relative w-full aspect-[4/3]">
                    <img src="assets/images/avatars/avatar-4.jpg" alt="" className="object-cover w-full h-full inset-0" />
                </div>
                <div className="relative w-full aspect-[4/3]">
                    <img src="assets/images/avatars/avatar-6.jpg" alt="" className="object-cover w-full h-full inset-0" />
                </div>

            </div>

        </div>
    );
};

export default IntroCard;