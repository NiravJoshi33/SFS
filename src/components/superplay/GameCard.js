import { IonIcon } from '@ionic/react';
import { arrowRedo, bookmark } from 'ionicons/icons';
import Image from 'next/image';
import React from 'react';

const GameCard = ({ game }) => {
    return (
        <div className="relative bg-white shadow-xl rounded-lg transition-transform transform duration-300 m-2">
            <div className="card shadow-xl">
                <div className="card-media h-40 relative">
                    <Image src={game.imgSrc} alt={game.title} layout="fill" className="object-cover rounded-t-lg" />
                    <div className="card-overly absolute inset-0 bg-black bg-opacity-25"></div>
                </div>
                <div className="card-body p-4">
                    <h4 className="card-title text-sm font-semibold">{game.title}</h4>
                    <p className="card-text">{game.viewers} Viewers</p> 
                    <div className="flex gap-2 mt-2">
                        <button type="button" className="button bg-secondery flex-1">Play</button>
                        <button type="button" className="button bg-secondery !w-auto">
                            <IonIcon icon={arrowRedo} className="text-base"></IonIcon>
                        </button>
                        <button type="button" className="button bg-secondery !w-auto">
                            <IonIcon icon={bookmark} className="text-base"></IonIcon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;