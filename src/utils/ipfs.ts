


import { create } from 'ipfs-http-client';

const client = create({
    host: 'ipfs-api.alchemy.com',
    port: 443,
    protocol: 'https',
    headers: {
        authorization: `Basic ${Buffer.from('https://eth-sepolia.g.alchemy.com/v2/xJ-24kZot7A4clN4WwSlvJzcIMNFFEDd').toString('base64')}`,
    },
});

export const uploadToIPFS = async (file) => {
    try {
        const added = await client.add(file);
        return `https://ipfs.io/ipfs/${added.path}`;
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw error;
    }
};

