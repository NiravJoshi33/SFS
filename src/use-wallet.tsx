import { useMemo, useState } from 'react';
// import { walletClient } from './ton-clients.js';
import { walletClient } from './ton-clients';

export const useWallet = () => {
    const [loading, setLoading] = useState(false);
    const [userAddress, setUserAddress] = useState<string>();

    // Don't show the full address, only the first and last characters. It also saves space
    const shortAddress = useMemo(() => {
        if (!userAddress) return '';
        return userAddress.slice(0, 5) + '...' + (userAddress || '').slice(-4);
    }, [userAddress]);

    // Open wallet connection modal and wait while users connects. Show loading spinner meanwhile.
    const onConnect = async () => {
        setLoading(true);

        const res = await walletClient.connect();
        if (res.error) {
            alert(res.error.message);
        } else {
            setUserAddress(res.data.account.address);
        }

        setLoading(false);
    };

    const onDisconnect = async () => {
        setLoading(true);
        const res = await walletClient.disconnect();
        if (res.data) {
            setUserAddress(undefined);
        }
        setLoading(false);
    };

    const connectButton = (
        <button disabled={loading} onClick={onConnect}>
            {loading ? 'Loading...' : 'Connect'}
        </button>
    );

    const disconnectButton = (
        <button disabled={loading} onClick={onDisconnect}>
            {loading ? 'Loading...' : 'Disconnect'}
        </button>
    );

    return {
        userAddress: shortAddress,
        connectButton,
        disconnectButton,
    };
};