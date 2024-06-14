import { toNano, beginCell, contractAddress, Address} from '@ton/core';
import { NftCollection, RoyaltyParams } from '../wrappers/NftCollection';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const OFFCHAIN_CONTENT_PREFIX = 0x01;
    const string_first = "ipfs://Qmdpjvr2YGQkW423jnqz8gFY8avtR2KsLiFSENV7Ly2SFz/";
    let newContent = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(string_first).endCell();

    // ===== Parameters =====
    // Replace owner with your address
    let owner = Address.parse("0QD3WvwxcwziTNcvdhfGLrw6XPv3BfuNe67DTxwpbMErl-FE"); 

    // Prepare the initial code and data for the contract
   
    let royaltiesParam: RoyaltyParams = {
        $$type: "RoyaltyParams",
        numerator: 350n, // 350n = 35%
        denominator: 1000n,
        destination: owner,
    };
    // let address = contractAddress(0, init);
    // let deployAmount = toNano("0.15");
    // let testnet = true;

    const nftCollection = provider.open( await NftCollection.fromInit(owner, newContent, royaltiesParam) )
   const res =  await nftCollection.send( provider.sender()    , {
        value: toNano("0.01")
    }, 'Mint')

console.log(res);


}