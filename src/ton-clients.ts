import { createWalletClientUI, createPublicClient, createContractClient } from '@fotonjs/core';
import { nftCollection, NftItem } from '../contracts';

// import { Counter } from '../contracts';

export const walletClient = createWalletClientUI({
    // Use TON testnet for development purposes
    chain: 'testnet',
    // Provide a link to the deployed manifest file
    manifestUrl: 'https://counter.foton.sh/tonconnect-manifest.json',
    restoreConnection: true,
});

export const publicClient = createPublicClient({
    api: 'testnet',
    // Provide your API key from Ton Center to increase the rate limits
    // authToken: 'token'
});

export const nftCollectionClient = createContractClient({
    // Use compiled Counter contract for the contractClient
    contract: nftCollection,
    // Provide the public and wallet clients to the contract client,
    // so it can access both the public method and the wallet connection
    publicClient,
    walletClient,
});


export const nftItemClient = createContractClient({
    // Use compiled Counter contract for the contractClient
    contract: NftItem,
    // Provide the public and wallet clients to the contract client,
    // so it can access both the public method and the wallet connection
    publicClient,
    walletClient,
});