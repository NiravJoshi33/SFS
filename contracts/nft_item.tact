import "@stdlib/deploy";
import "@stdlib/ownable";
message Transfer {
  query_id: Int as uint64;
  new_owner: Address;
}

message BuyItem {
  query_id: Int as uint64;
}

message ListOnSale {
  query_id: Int as uint64;
}

message SetPrice {
  query_id: Int as uint64;
  price: Int;
}
struct ItemData {
  owner: Address;
  collection_address: Address;
  item_index: Int;
  individual_content: String;
  price: Int;
  onSale: Bool;
}

contract NftItem with Deployable, Ownable {
  owner: Address;
  collection_address: Address;
  item_index: Int;
  individual_content: String = "https://maroon-annoyed-dinosaur-120.mypinata.cloud/ipfs/QmYjr5iArmLqM1SK6ErVtRqUjC12721q7NZkXZcBjrB6eQ";
  price: Int;
  onSale: Bool;

  init(owner: Address,
    collection_address: Address,
    item_index: Int,
    price: Int){
    self.owner = owner;
    self.collection_address = collection_address;
    self.item_index = item_index;
    self.price = price;
    self.onSale = true;
  }

  receive(msg: Transfer){
    self.requireOwner();
    self.owner = msg.new_owner;
  }

  receive(msg: BuyItem){
    require(self.onSale == true, "Fun Pass is not on the sale!!");
    let msgValue: Int = context().value;
    require(msgValue >= self.price, "Not enough amount sended! Try again!");
    self.owner = sender();
    self.onSale = false;
  }

  receive(msg: SetPrice){
    self.requireOwner();
    self.price = msg.price;
  }

  receive(msg: ListOnSale){
    self.requireOwner();
    self.onSale = true;
  }

  get fun getItemData(): ItemData {
    return
      ItemData{
        owner: self.owner,
        collection_address: self.collection_address,
        item_index: self.item_index,
        individual_content: self.individual_content,
        price: self.price,
        onSale: self.onSale
      };
  }

  get fun readOwner(): Address {
    return self.owner;
  }
}