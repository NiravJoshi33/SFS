# TACT Compilation Report
Contract: nftCollection
BOC Size: 1303 bytes

# Types
Total Types: 15

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## Transfer
TLB: `transfer#5e19f431 query_id:uint64 new_owner:address = Transfer`
Signature: `Transfer{query_id:uint64,new_owner:address}`

## BuyItem
TLB: `buy_item#9ba4031f query_id:uint64 = BuyItem`
Signature: `BuyItem{query_id:uint64}`

## ListOnSale
TLB: `list_on_sale#c7d8059c query_id:uint64 = ListOnSale`
Signature: `ListOnSale{query_id:uint64}`

## SetPrice
TLB: `set_price#82c79d87 query_id:uint64 price:int257 = SetPrice`
Signature: `SetPrice{query_id:uint64,price:int257}`

## ItemData
TLB: `_ owner:address collection_address:address item_index:int257 individual_content:^string price:int257 onSale:bool = ItemData`
Signature: `ItemData{owner:address,collection_address:address,item_index:int257,individual_content:^string,price:int257,onSale:bool}`

## Mint
TLB: `mint#290067bd query_id:uint64 price:int257 = Mint`
Signature: `Mint{query_id:uint64,price:int257}`

## CollectionData
TLB: `_ next_item_index:int257 collection_content:^cell owner_address:address = CollectionData`
Signature: `CollectionData{next_item_index:int257,collection_content:^cell,owner_address:address}`

# Get Methods
Total Get Methods: 5

## getNftItemInit
Argument: item_index
Argument: price

## getItemAddress
Argument: item_index

## gteCollectionData

## currentIndex

## owner

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
20615: sorry, nft is not on sale!
38112: send enough TON to buy!
62742: non-sequential NFTs