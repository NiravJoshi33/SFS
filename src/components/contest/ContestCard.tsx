import Image from 'next/image';
import React from 'react';

const ContestCard = ({ contest }) => {
  return (
    <div className="card uk-transition-toggle relative">
      <a href="#">
        <div className="card-media sm:aspect-[2/1.7] h-36 relative">
          <Image src={contest.imgSrc} alt={contest.title} layout="fill" className="object-cover" />
          <div className="card-overly absolute inset-0 bg-black bg-opacity-25"></div>
        </div>
      </a>
      <div className="card-body flex justify-between p-4">
        <div className="flex-1">
          <p className="card-text text-black font-medium line-clamp-1">{contest.title}</p>
          <div className="text-xs line-clamp-1 mt-1">{contest.description}</div>
        </div>
        <h4 className="card-title">{contest.price}</h4>
      </div>
      <div className="absolute w-full bottom-0 bg-white/20 backdrop-blur-sm uk-transition-slide-bottom-small max-xl:h-full z-[2] flex flex-col justify-center">
        <div className="flex gap-3 py-4 px-3">
          <button type="button" className="button bg-primary text-white flex-1">Chat</button>
          <button type="button" className="button border bg-white !w-auto">View</button>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;