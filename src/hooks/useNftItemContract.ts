import { useEffect, useState } from 'react';
import { NftItem } from '../../contracts';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract } from '@ton/core';
import { parseTon } from '@fotonjs/core';

export function useNftItemContract() {
    const client = useTonClient();
    const [val, setVal] = useState<null | string>();
    const { sender } = useTonConnect();

    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

    const NftItemContract = useAsyncInitialize(async () => {
        if (!client) return;
        const contract = new NftItem(
            Address.parse('EQBa9WYiSbohh2aDF2bHWEG7TpYcOF8WY0d2OXEm6dK4Od6z') // replace with your address from tutorial 2 step 8
        );
        return client.open(contract) as OpenedContract<NftItem>;
    }, [client]);

    const buyFunPass = async (address: string, amount: bigint) => {

        let contract = new NftItem(Address.parse(address));
        let item = await client?.open(contract);

        item?.send(
            sender,
            {
                value: amount,
            },
            {
                $$type: 'BuyItem',
                query_id: BigInt(Math.floor(Math.random() * 1000)),
            }
        );
    }

    return {
        // value: val,
        // address: NftItemContract?.address.toString(),
        // buyFunPass: () => {

        //     // const mintMessage: Mint = {
        //     //     $$type: 'Mint',
        //     //     query_id: 0n,
        //     //     price: 0n
        //     // };

        //     return NftItemContract?.send(
        //         sender,
        //         {
        //             value: parseTon("0.13"),
        //             // bounce: false,
        //         },
        //         {
        //             $$type: 'BuyItem',
        //             query_id: BigInt(Math.floor(Math.random() * 1000)),
        //             // price: parseTon("0.0323"),
        //         }
        //     );
        // },
        buyFunPass
    };
}
