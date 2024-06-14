'use client';
import React, { useContext } from 'react';
import EntryPass from './EntryPass';
import { useNftItemContract } from '../../hooks/useNftItemContract';
import { TONContext } from "../../context/tonContext"
import { parseTon } from '@fotonjs/core';
// import { useNftCollectionContract } from '../../hooks/useNftCollectionContract';
const EntryPassCards = () => {
    const tonContext = useContext(TONContext);
    const { funPass } = tonContext;
    // console.log(Number(funPass[0]?.price / 1000000000));


    const { buyFunPass } = useNftItemContract();
    // const { readNftData } = useNftCollectionContract();

    return (
        <div className="box p-5 px-6">

            <div className="flex items-ce justify-between text-black dark:text-white">
                <h3 className="font-bold text-lg"> Fun Pass
                </h3>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {funPass && funPass.map((item) => (
                    <div key={item.tokenId}>
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                            <img src={item.image} alt={item.description} className="object-cover w-full h-full inset-0" />
                        </div>
                        <div className="mt-2 line-clamp-1 flex justify-center">
                            <button onClick={() => buyFunPass(item?.itemAddress, item?.price)} type="button" className="relative py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-2 border-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-border w-full max-w-xs">
                                <span className="absolute inset-0 bg-white rounded-lg p-1.5"></span>
                                <span className="relative">Fun Pass {Number(item?.price) / 1000000000} TON</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default EntryPassCards;