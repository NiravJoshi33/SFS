import { useEffect, useState } from 'react';
import { parseTon } from '@fotonjs/core';
import { buildOnchainMetadata } from './utils/helper.js';
import { nftCollectionClient, publicClient, nftItemClient } from './ton-clients.js';
import { beginCell } from '@ton/core';
const LS_KEY = 'counter-contract-address';

export const useContract = () => {
    const [loading, setLoading] = useState(false);

    const [collectionAddress, setCollectionAddress] = useState<string | undefined>(localStorage.getItem(LS_KEY) || undefined);

    const setAddress = (address: string) => {
        console.log('collection address==', address);

        localStorage.setItem(LS_KEY, address);
        setCollectionAddress(address);
    };

    useEffect(() => {
        nftCollectionClient.setAddress(collectionAddress);
        nftItemClient.setAddress('EQBOSnVRTdPYU8_V4nCBhRVCv6BtUABBkjPbW25LR7ntmoR7');
    }, [collectionAddress]);


    const onDeploy = async () => {

        const metadata = {
            name: 'SuperFun Social',
            description: 'Nft collection for SuperPlay Entry Pass',
            image: 'https://avatars.githubusercontent.com/u/104382459?s=200&v=4',
            cover_image:
                'https://avatars.githubusercontent.com/u/104382459?s=200&v=4',
        };
        let content = buildOnchainMetadata(metadata);

        const res = await nftCollectionClient.deploy({
            value: parseTon('0.1'),
            arguments: [content],
            payload: {
                queryId: BigInt(Math.floor(Math.random() * 1000)),
            },
        });

        if (res.data) {
            setAddress(res.data.address);
        } else {
            alert(res.error.message);
        }
    };

    const buyItem = async () => {
        if (!nftItemClient) return;
        const res = await nftItemClient.write({
            method: 'BuyItem',
            value: parseTon("0.009"),
            payload: {
                query_id: BigInt(Math.floor(Math.random() * 1000)),
            }
        })

        if (res.data) {
            const receipt = await publicClient.waitForTransaction({ hash: res.data });
            // if (receipt?.) {
            // }

            // await publicClient.waitForTransaction({ hash: res.data });
        } else {
            console.log(res.error);
        }
    }
    const setPrice = async () => {
        if (!nftItemClient) return;
        const res = await nftItemClient.write({
            method: 'SetPrice',
            value: parseTon("0.023"),
            payload: {
                query_id: BigInt(Math.floor(Math.random() * 1000)),
                price: parseTon("0.009")
            }
        })

        if (res.data) {
            await publicClient.waitForTransaction({ hash: res.data });
        } else {
            console.log(res.error);
        }
    }
    const listOnSale = async () => {
        if (!nftItemClient) return;
        const res = await nftItemClient.write({
            method: 'ListOnSale',
            value: parseTon("0.003"),
            payload: {
                query_id: BigInt(Math.floor(Math.random() * 1000)),
            }
        })
        if (res.data) {
            await publicClient.waitForTransaction({ hash: res.data });
        } else {
            console.log(res.error);
        }
    }


    const mintNftItem = async () => {
        if (!collectionAddress) return;
        setLoading(true);
        const res = await nftCollectionClient.write({
            method: 'Mint',
            value: parseTon('0.13'),
            payload: {
                query_id: BigInt(Math.floor(Math.random() * 1000)),
                price: parseTon("0.023"),
            }
        })
        if (res.data) {
            await publicClient.waitForTransaction({ hash: res.data });
            setLoading(false);
        } else {
            console.log(res.error);
        }
        setLoading(false);
    };

    // const getCollectionData = async () => {
    //     if (!collectionAddress) return;

    //     const res = await nftCollectionClient.read({
    //         getter: 'getCollectionData',
    //         arguments: [],
    //     });
    //     console.log('col data-----', res.data);

    // };

    // const getNftItemData = async () => {
    //     if (!collectionAddress) return;

    //     const res = await nftItemClient.read({
    //         getter: 'getItemData',
    //         arguments: [],
    //     });
    //     console.log('col data-----', res.data);
    //     // console.log(res.data?.individual_content.beginParse().loadStringTail())
    // };

    const deployButton = (
        <button onClick={onDeploy}>
            Deploy nft Collection contract
        </button>
    );

    const mintItemButton = (
        <>
            {/* <span>Counter: {counterAmount?.toString()}</span> */}
            <button disabled={loading} onClick={mintNftItem}>
                {loading ? 'Loading...' : 'Mint Item'}
            </button>
            {/* <button disabled={loading} onClick={buyItem}>
                {loading ? 'Loading...' : 'Buy Item.'}
            </button> */}
            <button disabled={loading} onClick={setPrice}>
                {loading ? 'Loading...' : 'Set Price.'}
            </button>
            <button disabled={loading} onClick={listOnSale}>
                {loading ? 'Loading...' : 'List on sale.'}
            </button>
        </>
    );

    return {
        collectionAddress,
        deployButton,
        mintItemButton,

    };
};