import { toNano, beginCell, contractAddress, Address} from '@ton/core';
// import { NftCollection, RoyaltyParams, loadLogEventMintRecord } from '../wrappers/NftCollection';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const OFFCHAIN_CONTENT_PREFIX = 0x01;
    const string_first = "ipfs://QmcbfaS1Yjf6pe8b8g9sNKyaEitHTxXeotm3Ay6CAnnHWW/";
    let newContent = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(string_first).endCell();

    // ===== Parameters =====
    // Replace owner with your address
    let owner = Address.parse("0QD3WvwxcwziTNcvdhfGLrw6XPv3BfuNe67DTxwpbMErl-FE"); 
    // let royaltiesParam: RoyaltyParams = {
    //     $$type: "RoyaltyParams",
    //     numerator: 350n, // 350n = 35%
    //     denominator: 1000n,
    //     destination: owner,
    // };
    // let address = contractAddress(0, init);
    // let deployAmount = toNano("0.15");
    // let testnet = true;

    // const nftCollection = provider.open( await NftCollection.fromInit(owner, newContent, royaltiesParam));

    // await nftCollection.send(provider.sender(), { value: toNano(0.2) }, "Mint");

    // let current_index = (await nftCollection.getGetCollectionData()).next_item_index;
    // console.log(current_index, "current index");

    
    // await nftCollection.send(
    //     provider.sender(),
    //     {
    //         value: toNano('0.05'),
    //     },
    //     {
    //         $$type: 'Deploy',
    //         queryId: 0n,
    //     }
    // );
  
//   await provider.waitForDeploy(nftCollection.address);

    // Check if the transaction was successful and log the result
        // console.log("Transaction confirmed. nftCollection - ", nftCollection.address);
        




    // Check if the transaction was successful and log the result
        // If deploy_result contains the transaction hash or receipt, log it here
        // Example: console.log("Transaction hash: ", deploy_result.tx_hash);

        // If deploy_result contains external messages, log them here
        // Example: console.log("External Message(string - base64): ", deploy_result.externals[0].body.toBoc().toString("base64"));

        // If you're expecting to load a Log Event of the Mint Record, do it here
        // Example: let loadEvent = loadLogEventMintRecord(deploy_result.externals[0].body.asSlice());
        // console.log("ItemId: ", loadEvent.item_id);
        // console.log("The Random Number: ", loadEvent.generate_number);

        // console.log("External Message(string - base64): " + deploy_result);
        // console.log("External Message(string - hex): " + await deploy_result.externals[0].body.toBoc().toString("hex"));
        // // printSeparator();

        // // Print the Log Event of the Mint Record
        // let loadEvent = loadLogEventMintRecord(deploy_result.externals[0].body.asSlice());
        // console.log("ItemId: " + loadEvent.item_id);
        // console.log("The Random Number: " + loadEvent.generate_number);

        // const nftItemAddress = await nftCollection.getGetNftAddressByIndex(0n);
        // console.log("nftItemAddress - ", nftItemAddress)
    // run methods on `nftCollection`
}
