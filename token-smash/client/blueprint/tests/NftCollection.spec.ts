import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano, beginCell } from '@ton/core';
import { NftCollection, RoyaltyParams, loadLogEventMintRecord } from '../wrappers/NftCollection';
import '@ton/test-utils';

describe('NftCollection', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nftCollection: SandboxContract<NftCollection>;

    beforeEach(async () => {

        const OFFCHAIN_CONTENT_PREFIX = 0x01;
        const string_first = "https://salmon-governing-canidae-592.mypinata.cloud/ipfs/QmQYUEJqsfkSNyJ8Vxdsq5ZpLyp9cyw81HWPemkJ2tBuzF/collection.json";
        let newContent = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(string_first).endCell();
    
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');

        let royaltiesParam: RoyaltyParams = {
            $$type: "RoyaltyParams",
            numerator: 350n, // 350n = 35%
            denominator: 1000n,
            destination: deployer.address,
        };
        nftCollection = blockchain.openContract(
            await NftCollection.fromInit(deployer.address, newContent, royaltiesParam)
        );

        const deploy_result = await nftCollection.send(deployer.getSender(), { value: toNano(1) }, "Mint");
        console.log(deploy_result,"deploy_result");
        
        expect(deploy_result.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftCollection.address,
            deploy: true,
            success: true,
        });
    });



    it("should deploy correctly", async () => {
        await nftCollection.send(deployer.getSender(), { value: toNano(2) }, "Mint");

        let current_index = (await nftCollection.getGetCollectionData()).next_item_index;
        const deploy_result = await nftCollection.send(deployer.getSender(), { value: toNano(1) }, "Mint"); // Send Mint Transaction
        expect(deploy_result.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftCollection.address,
            success: true,
        });
        let next_index = (await nftCollection.getGetCollectionData()).next_item_index;
        expect(next_index).toEqual(current_index + 1n);
        // printSeparator();

        console.log("External Message(string - base64): " + deploy_result.externals[0].body.toBoc().toString("base64"));
        console.log("External Message(string - hex): " + deploy_result.externals[0].body.toBoc().toString("hex"));
        // printSeparator();

        // Print the Log Event of the Mint Record
        let loadEvent = loadLogEventMintRecord(deploy_result.externals[0].body.asSlice());
        console.log("ItemId: " + loadEvent.item_id);
        console.log("The Random Number: " + loadEvent.generate_number);
    });
    it("Test", async () => {
        console.log("Next IndexID: " + (await nftCollection.getGetCollectionData()).next_item_index);
    
        console.log("Collection Address: " + nftCollection.address);
        console.log("Conent" +(await nftCollection.getGetCollectionData()).collection_content.beginParse().loadStringTail());
        
    });

});
