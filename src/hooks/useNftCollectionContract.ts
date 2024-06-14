import { useEffect, useState } from 'react';
import { NftItem } from '../../contracts';
import { nftCollection, Mint } from '../../contracts/nftCollection/counter_nftCollection';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract } from '@ton/core';
import { parseTon } from '@fotonjs/core';
import { useTonConnectUI } from '@tonconnect/ui-react';

export function useNftCollectionContract() {

    const [tonConnectUI] = useTonConnectUI();
    console.log('coneected ??', tonConnectUI.connected);

    const client = useTonClient();
    const [val, setVal] = useState<null | string>();
    const [nftItems, setNftItems] = useState<Item[]>([]);
    const { sender } = useTonConnect();

    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

    const NFTCollectionContract = useAsyncInitialize(async () => {
        if (!client) return;
        const contract = new nftCollection(
            Address.parse('EQCBd_St5sbIPFBNVArBZ6MuBPNpdDKGiYPb8Sm5VTXYIaDs') // replace with your address from tutorial 2 step 8
        );
        return client.open(contract) as OpenedContract<nftCollection>;
    }, [client]);

    useEffect(() => {
        async function getValue() {
            if (!NFTCollectionContract) return;
            setVal(null);
            const val = await NFTCollectionContract.getCurrentIndex();
            setVal(val.toString());
            await sleep(5000); // sleep 5 seconds and poll value again
            getValue();
        }
        getValue();
    }, [NFTCollectionContract]);


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


    const readNftData = async () => {
        if (!NFTCollectionContract) return;
        const res = await NFTCollectionContract.getCurrentIndex();
        console.log('C index -----', Number(res));
        let index = Number(res);
        if (index > 0) {
            for (let i = 0; i < index; i++) {
                console.log('loop no', i);

                let itemAddr = await NFTCollectionContract.getGetItemAddress(BigInt(i));
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


    return {
        value: val,
        address: NFTCollectionContract?.address.toString(),
        sendIncrement: () => {

            // const mintMessage: Mint = {
            //     $$type: 'Mint',
            //     query_id: 0n,
            //     price: 0n
            // };

            return NFTCollectionContract?.send(
                sender,
                {
                    value: parseTon("0.13"),
                    // bounce: false,
                },
                {
                    $$type: 'Mint',
                    query_id: BigInt(Math.floor(Math.random() * 1000)),
                    price: parseTon("0.0323"),
                }
            );
        },

        readNftData
    };
}
