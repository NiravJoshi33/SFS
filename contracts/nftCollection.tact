import "@stdlib/deploy";
import "@stdlib/ownable";
import "./nft_item.tact";
message Mint {
  query_id: Int as uint64;
  price: Int;
}
struct CollectionData {
  next_item_index: Int;
  collection_content: Cell;
  owner_address: Address;
}

contract nftCollection with Deployable, Ownable {
  const minTonForStorage: Int = ton("0.03");
  const gasConsumption: Int = ton("0.03");
  owner: Address;
  next_item_index: Int as uint32 = 0;
  collection_content: Cell;
  itemRecord: map<Int, Address>;
  init(collection_content: Cell){
    self.owner = sender();
    self.collection_content = collection_content;
    // " this one is different ..";
  }

  receive(msg: Mint){
    self.requireOwner();
    self.mint(sender(), msg.price);
  }

  fun mint(receiver: Address, price: Int) {
    require(self.next_item_index >= 0, "non-sequential NFTs");
    let nft_init: StateInit = self.getNftItemInit(self.next_item_index, price);
    let msgValue: Int = context().value;
    let tonBalanceBeforeMsg: Int = (myBalance() - msgValue);
    let storageFee: Int =
      (self.minTonForStorage - min(tonBalanceBeforeMsg, self.minTonForStorage));
    msgValue = (msgValue - (storageFee + self.gasConsumption));
    send(SendParameters{
        to: contractAddress(nft_init),
        value: msgValue,
        mode: SendIgnoreErrors,
        bounce: false,
        body: Transfer{query_id: 0, new_owner: receiver}.toCell(),
        code: nft_init.code,
        data: nft_init.data
      }
    );
    self.itemRecord.set(self.next_item_index, contractAddress(nft_init));
    self.next_item_index = (self.next_item_index + 1);
  }

  get fun getNftItemInit(item_index: Int, price: Int): StateInit {
    return initOf NftItem(self.owner, myAddress(), item_index, price);
  }

  // get fun getNftAddressByIndex (item_index: Int): Address {
  //     let initCode: StateInit = self.getNftItemInit(item_index);
  //     return contractAddress(initCode);
  // }

  get fun getItemAddress(item_index: Int): Address {
    let item: Address = self.itemRecord.get(item_index)!!;
    return item;
  }

  get fun gteCollectionData(): CollectionData {
    return
      CollectionData{
        next_item_index: self.next_item_index,
        collection_content: self.collection_content,
        owner_address: self.owner
      };
  }

  get fun currentIndex(): Int {
    return self.next_item_index;
  }
}