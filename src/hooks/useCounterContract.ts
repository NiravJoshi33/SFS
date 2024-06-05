import { useEffect, useState } from 'react';
// import Counter from '../contracts/counter';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract } from '@ton/core';
// import { nftCollection, NftItem } from '../../contracts';
import { NftItem, nftCollection } from '../../contracts';
import { useContract } from '../use-contract';
import { useWallet } from '../use-wallet';
import { useTonConnect } from './useTonConnect';

export function useCounterContract() {
    const { userAddress } = useWallet();
    const [nftItems, setNftItems] = useState<Item[]>([]);
    console.log(nftItems);


    const { collectionAddress } = useContract();
    const client = useTonClient();

    const nftCollectionContract = useAsyncInitialize(async () => {
        if (!client || !collectionAddress) return;
        const contract = new nftCollection(
            Address.parse(collectionAddress)
        );
        return client.open(contract) as OpenedContract<nftCollection>;
    }, [client, collectionAddress]);

    // useEffect(() => {
    //     async function getValue() {
    //         console.log('im innnnn');
    //         console.log('nft col addr', nftCollectionContract?.address.toString());
    //         console.log('user addr', userAddress);

    //         if (!nftCollectionContract || !userAddress) return;
    //         const res = await nftCollectionContract.getCurrentIndex();
    //         console.log('C index -----', Number(res));
    //     }
    //     getValue();
    // }, [userAddress, nftCollectionContract]);



    const nftItem = useAsyncInitialize(async () => {
        if (!client) return;
        const contract = new NftItem(
            Address.parse('EQBOSnVRTdPYU8_V4nCBhRVCv6BtUABBkjPbW25LR7ntmoR7')
        );
        return client.open(contract) as OpenedContract<NftItem>;
    }, [client]);



    const readAddress = async () => {
        try {
            // if (!nftCollectionContract) return;
            // // const res = await nftCollectionContract?.getGetNftItemInit(2n, uri, price)
            // const res = await nftCollectionContract?.getGetItemAddress(0n);
            // console.log('item address -----', res.toString());
        } catch (error) {
            console.log(error);
        }
    };

    type Item = {
        itemAddress: string;
        tokenId: string;
        title: string;
        description: string;
        image: string;
        owner: string;
        onSale: boolean;
        price: bigint;
        collection_address: string;
    };


    const readCurrentIndex = async () => {
        if (!nftCollectionContract) return;
        const res = await nftCollectionContract.getCurrentIndex();
        console.log('C index -----', Number(res));
        let index = Number(res);
        if (index > 0) {
            for (let i = 0; i < index; i++) {
                console.log('loop no', i);

                let itemAddr = await nftCollectionContract.getGetItemAddress(BigInt(i));
                console.log('item addr --', itemAddr.toString());

                let contract = new NftItem(itemAddr);
                let item = client?.open(contract);

                const itemData = await item.getGetItemData();
                const res = await fetch(itemData.individual_content);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                console.log('fetched data', data);

                const newNftItem: Item = {
                    itemAddress: itemAddr.toString(),
                    tokenId: itemData.item_index.toString(),
                    title: data.name,
                    description: data.description,
                    image: data.image,
                    owner: itemData.owner.toString(),
                    onSale: itemData.onSale,
                    price: itemData.price,
                    collection_address: itemData.collection_address.toString()
                }

                setNftItems(prevItems => [...prevItems, newNftItem]);

                // console.log('indi content-----', res.individual_content);

            }
        }
    };


    const getNftItemData = async () => {
        if (!nftItem) return;

        // const res = await nftItem.getGetItemData();
        const res = await nftItem.getGetItemData();

        console.log('col add-----', res.collection_address.toString());
        console.log('indi content-----', res.individual_content);
        console.log('index-----', res.item_index.toString());
        console.log('owner -----', res.owner.toString());
        console.log('price-----', res.price);
        console.log('onsale ?? ---', res.onSale);
    };



    return {
        address: nftCollectionContract?.address.toString(),
        readAddress,
        readCurrentIndex,
        getNftItemData,
        nftItems,
    };
}