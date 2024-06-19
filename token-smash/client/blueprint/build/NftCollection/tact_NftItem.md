# TACT Compilation Report
Contract: NftItem
BOC Size: 1715 bytes

# Types
Total Types: 24

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

## LogEventMintRecord
TLB: `log_event_mint_record#a3877d65 minter:address item_id:int257 generate_number:int257 = LogEventMintRecord`
Signature: `LogEventMintRecord{minter:address,item_id:int257,generate_number:int257}`

## MarketItemCreated
TLB: `market_item_created#5fc6f0fb itemId:int257 nftAddress:address seller:address owner:address price:int257 isListed:bool = MarketItemCreated`
Signature: `MarketItemCreated{itemId:int257,nftAddress:address,seller:address,owner:address,price:int257,isListed:bool}`

## GetRoyaltyParams
TLB: `get_royalty_params#693d3950 query_id:uint64 = GetRoyaltyParams`
Signature: `GetRoyaltyParams{query_id:uint64}`

## ReportRoyaltyParams
TLB: `report_royalty_params#a8cb00ad query_id:uint64 numerator:uint16 denominator:uint16 destination:address = ReportRoyaltyParams`
Signature: `ReportRoyaltyParams{query_id:uint64,numerator:uint16,denominator:uint16,destination:address}`

## CollectionData
TLB: `_ next_item_index:int257 collection_content:^cell owner_address:address = CollectionData`
Signature: `CollectionData{next_item_index:int257,collection_content:^cell,owner_address:address}`

## RoyaltyParams
TLB: `_ numerator:int257 denominator:int257 destination:address = RoyaltyParams`
Signature: `RoyaltyParams{numerator:int257,denominator:int257,destination:address}`

## Transfer
TLB: `transfer#ecf3dcd9 query_id:uint64 new_owner:address response_destination:Maybe address custom_payload:Maybe ^cell forward_amount:coins forward_payload:remainder<slice> = Transfer`
Signature: `Transfer{query_id:uint64,new_owner:address,response_destination:Maybe address,custom_payload:Maybe ^cell,forward_amount:coins,forward_payload:remainder<slice>}`

## OwnershipAssigned
TLB: `ownership_assigned#05138d91 query_id:uint64 prev_owner:address forward_payload:remainder<slice> = OwnershipAssigned`
Signature: `OwnershipAssigned{query_id:uint64,prev_owner:address,forward_payload:remainder<slice>}`

## Excesses
TLB: `excesses#d53276db query_id:uint64 = Excesses`
Signature: `Excesses{query_id:uint64}`

## GetStaticData
TLB: `get_static_data#2fcb26a2 query_id:uint64 = GetStaticData`
Signature: `GetStaticData{query_id:uint64}`

## ReportStaticData
TLB: `report_static_data#8b771735 query_id:uint64 index_id:int257 collection:address = ReportStaticData`
Signature: `ReportStaticData{query_id:uint64,index_id:int257,collection:address}`

## GetNftData
TLB: `_ is_initialized:bool index:int257 collection_address:address owner_address:address individual_content:^cell = GetNftData`
Signature: `GetNftData{is_initialized:bool,index:int257,collection_address:address,owner_address:address,individual_content:^cell}`

## MarketItem
TLB: `_ index:int257 nftContract:address seller:address owner:address price:int257 isListed:bool sold:bool = MarketItem`
Signature: `MarketItem{index:int257,nftContract:address,seller:address,owner:address,price:int257,isListed:bool,sold:bool}`

## Bought
TLB: `bought#5ce64898 index:int257 nftAddress:address price:int257 seller:address buyer:address = Bought`
Signature: `Bought{index:int257,nftAddress:address,price:int257,seller:address,buyer:address}`

## TokenCreated
TLB: `token_created#ac2b4a96 sender:address nftAddress:address = TokenCreated`
Signature: `TokenCreated{sender:address,nftAddress:address}`

## Buy
TLB: `buy#7d661634 query_id:uint64 nftId:int257 = Buy`
Signature: `Buy{query_id:uint64,nftId:int257}`

## ListOnSale
TLB: `list_on_sale#2e53659f query_id:uint64 nftId:int257 nftAddress:address price:int257 = ListOnSale`
Signature: `ListOnSale{query_id:uint64,nftId:int257,nftAddress:address,price:int257}`

## SetPrice
TLB: `set_price#82c79d87 query_id:uint64 price:int257 = SetPrice`
Signature: `SetPrice{query_id:uint64,price:int257}`

# Get Methods
Total Get Methods: 1

## get_nft_data

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
8348: Invalid NFT ID or price
27499: initialized tx need from collection
28696: NFT not for sale
49280: not owner
49469: not from collection
51526: Item already sold
55154: Insufficient funds or not listed
62742: non-sequential NFTs