import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1578759217, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1578759217) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type BuyItem = {
    $$type: 'BuyItem';
    query_id: bigint;
}

export function storeBuyItem(src: BuyItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2611217183, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadBuyItem(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2611217183) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'BuyItem' as const, query_id: _query_id };
}

function loadTupleBuyItem(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'BuyItem' as const, query_id: _query_id };
}

function storeTupleBuyItem(source: BuyItem) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserBuyItem(): DictionaryValue<BuyItem> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBuyItem(src)).endCell());
        },
        parse: (src) => {
            return loadBuyItem(src.loadRef().beginParse());
        }
    }
}

export type ListOnSale = {
    $$type: 'ListOnSale';
    query_id: bigint;
}

export function storeListOnSale(src: ListOnSale) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3352823196, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadListOnSale(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3352823196) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'ListOnSale' as const, query_id: _query_id };
}

function loadTupleListOnSale(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'ListOnSale' as const, query_id: _query_id };
}

function storeTupleListOnSale(source: ListOnSale) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserListOnSale(): DictionaryValue<ListOnSale> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeListOnSale(src)).endCell());
        },
        parse: (src) => {
            return loadListOnSale(src.loadRef().beginParse());
        }
    }
}

export type SetPrice = {
    $$type: 'SetPrice';
    query_id: bigint;
    price: bigint;
}

export function storeSetPrice(src: SetPrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2194120071, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.price, 257);
    };
}

export function loadSetPrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2194120071) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'SetPrice' as const, query_id: _query_id, price: _price };
}

function loadTupleSetPrice(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _price = source.readBigNumber();
    return { $$type: 'SetPrice' as const, query_id: _query_id, price: _price };
}

function storeTupleSetPrice(source: SetPrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserSetPrice(): DictionaryValue<SetPrice> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetPrice(src)).endCell());
        },
        parse: (src) => {
            return loadSetPrice(src.loadRef().beginParse());
        }
    }
}

export type ItemData = {
    $$type: 'ItemData';
    owner: Address;
    collection_address: Address;
    item_index: bigint;
    individual_content: string;
    price: bigint;
    onSale: boolean;
}

export function storeItemData(src: ItemData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.collection_address);
        b_0.storeInt(src.item_index, 257);
        b_0.storeStringRefTail(src.individual_content);
        let b_1 = new Builder();
        b_1.storeInt(src.price, 257);
        b_1.storeBit(src.onSale);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadItemData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _collection_address = sc_0.loadAddress();
    let _item_index = sc_0.loadIntBig(257);
    let _individual_content = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _price = sc_1.loadIntBig(257);
    let _onSale = sc_1.loadBit();
    return { $$type: 'ItemData' as const, owner: _owner, collection_address: _collection_address, item_index: _item_index, individual_content: _individual_content, price: _price, onSale: _onSale };
}

function loadTupleItemData(source: TupleReader) {
    let _owner = source.readAddress();
    let _collection_address = source.readAddress();
    let _item_index = source.readBigNumber();
    let _individual_content = source.readString();
    let _price = source.readBigNumber();
    let _onSale = source.readBoolean();
    return { $$type: 'ItemData' as const, owner: _owner, collection_address: _collection_address, item_index: _item_index, individual_content: _individual_content, price: _price, onSale: _onSale };
}

function storeTupleItemData(source: ItemData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.collection_address);
    builder.writeNumber(source.item_index);
    builder.writeString(source.individual_content);
    builder.writeNumber(source.price);
    builder.writeBoolean(source.onSale);
    return builder.build();
}

function dictValueParserItemData(): DictionaryValue<ItemData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeItemData(src)).endCell());
        },
        parse: (src) => {
            return loadItemData(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    query_id: bigint;
    price: bigint;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(687892413, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.price, 257);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 687892413) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'Mint' as const, query_id: _query_id, price: _price };
}

function loadTupleMint(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _price = source.readBigNumber();
    return { $$type: 'Mint' as const, query_id: _query_id, price: _price };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner_address: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeRef(src.collection_content);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadIntBig(257);
    let _collection_content = sc_0.loadRef();
    let _owner_address = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

type NftItem_init_args = {
    $$type: 'NftItem_init_args';
    owner: Address;
    collection_address: Address;
    item_index: bigint;
    price: bigint;
}

function initNftItem_init_args(src: NftItem_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.collection_address);
        b_0.storeInt(src.item_index, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.price, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function NftItem_init(owner: Address, collection_address: Address, item_index: bigint, price: bigint) {
    const __code = Cell.fromBase64('te6ccgECGgEABOMAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFds88uCCEgQFAgEgDQ4E5gGSMH/gcCHXScIflTAg1wsf3iCCEF4Z9DG6jrow0x8BghBeGfQxuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEjFVUNs8bBV/4CCCEJukAx+64wIgghCCx52HuuMCIIIQx9gFnLoJBgcIAMzI+EMBzH8BygBVUFBlINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMhYzxbJAcwCyIEBAc8AygDJAczJ7VQAYjDTHwGCEJukAx+68uCB0z8BMTCBUIc2wP8V8vT4QW8kE18DggCU4FEVvvL0+EIEcH8BSjDTHwGCEILHnYe68uCB0z+BAQHXAFlsEjFVUNs8MRBFEDRBMH8JApyOmDDTHwGCEMfYBZy68uCB0z8BMTDbPDB/f+CCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAJCgAS+EJSYMcF8uCEATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAsByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIA8QAgEgFhcCEbh6zbPNs8bGaBIRAhG4Ud2zzbPGxhgSEwAMVHVDVHVDAeztRNDUAfhj0gABjl76QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDUAdAB1AHQgQEB1wDSADAQJhAlECQQI2wW4Pgo1wsKgwm68uCJFAACJQGu+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA1AHQgQEB1wAwFEMwBNFVAts8FQDWjRmaHR0cHM6Ly9tYXJvb24tYW5ub3llZC1kaW5vc2F1ci0xMjAubXlwaW5hdGEuY2xvdWQvaXBmcy9RbVdvdGs4M1llcmhxUUFhc3kxcVF6M2t1QVI3emJGa0pGMk42eHFoUTdQTDJygAX8Aubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSCcEDOdWnnFfnSULAdYW4mR7KAIBSBgZABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVpqWjNKWXo0U25zZWZNNjJCUTRnclpaY3BaS1VoWThTQ1ZGcFlYcUNNaWsygg');
    const __system = Cell.fromBase64('te6cckECHAEABO0AAQHAAQEFoPPVAgEU/wD0pBP0vPLICwMCAWIEDgN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRXbPPLgghMFDQTmAZIwf+BwIddJwh+VMCDXCx/eIIIQXhn0MbqOujDTHwGCEF4Z9DG68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSMVVQ2zxsFX/gIIIQm6QDH7rjAiCCEILHnYe64wIgghDH2AWcugkGBwgAYjDTHwGCEJukAx+68uCB0z8BMTCBUIc2wP8V8vT4QW8kE18DggCU4FEVvvL0+EIEcH8BSjDTHwGCEILHnYe68uCB0z+BAQHXAFlsEjFVUNs8MRBFEDRBMH8JApyOmDDTHwGCEMfYBZy68uCB0z8BMTDbPDB/f+CCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAJCgAS+EJSYMcF8uCEATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAsByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzADMyPhDAcx/AcoAVVBQZSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDIWM8WyQHMAsiBAQHPAMoAyQHMye1UAgEgDxcCASAQEgIRuHrNs82zxsZoExEADFR1Q1R1QwIRuFHds82zxsYYExYB7O1E0NQB+GPSAAGOXvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANQB0AHUAdCBAQHXANIAMBAmECUQJBAjbBbg+CjXCwqDCbry4IkUAa76QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDUAdCBAQHXADAUQzAE0VUC2zwVANaNGZodHRwczovL21hcm9vbi1hbm5veWVkLWRpbm9zYXVyLTEyMC5teXBpbmF0YS5jbG91ZC9pcGZzL1FtV290azgzWWVyaHFRQWFzeTFxUXoza3VBUjd6YkZrSkYyTjZ4cWhRN1BMMnKABfwACJQIBIBgZALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnCdl05as07LczoOlm2UZuikgnBAznVp5xX50lCwHWFuJkeygCAUgaGwARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1aalozSll6NFNuc2VmTTYyQlE0Z3JaWmNwWktVaFk4U0NWRnBZWHFDTWlrMoIJMmczM=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftItem_init_args({ $$type: 'NftItem_init_args', owner, collection_address, item_index, price })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const NftItem_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    20615: { message: `sorry, nft is not on sale!` },
    38112: { message: `send enough TON to buy!` },
    62742: { message: `non-sequential NFTs` },
}

const NftItem_types: ABIType[] = [
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounced", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "Deploy", "header": 2490013878, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "DeployOk", "header": 2952335191, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "FactoryDeploy", "header": 1829761339, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "cashback", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ChangeOwner", "header": 2174598809, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "newOwner", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ChangeOwnerOk", "header": 846932810, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "newOwner", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "Transfer", "header": 1578759217, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "new_owner", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "BuyItem", "header": 2611217183, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "ListOnSale", "header": 3352823196, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "SetPrice", "header": 2194120071, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "ItemData", "header": null, "fields": [{ "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "collection_address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "item_index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "individual_content", "type": { "kind": "simple", "type": "string", "optional": false } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "onSale", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "Mint", "header": 687892413, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "price", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "CollectionData", "header": null, "fields": [{ "name": "next_item_index", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "collection_content", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "owner_address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
]

const NftItem_getters: ABIGetter[] = [
    { "name": "getItemData", "arguments": [], "returnType": { "kind": "simple", "type": "ItemData", "optional": false } },
    { "name": "owner", "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
]

const NftItem_receivers: ABIReceiver[] = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "Transfer" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "BuyItem" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetPrice" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ListOnSale" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
]

export class NftItem implements Contract {

    static async init(owner: Address, collection_address: Address, item_index: bigint, price: bigint) {
        return await NftItem_init(owner, collection_address, item_index, price);
    }

    static async fromInit(owner: Address, collection_address: Address, item_index: bigint, price: bigint) {
        const init = await NftItem_init(owner, collection_address, item_index, price);
        const address = contractAddress(0, init);
        return new NftItem(address, init);
    }

    static fromAddress(address: Address) {
        return new NftItem(address);
    }

    readonly address: Address;
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types: NftItem_types,
        getters: NftItem_getters,
        receivers: NftItem_receivers,
        errors: NftItem_errors,
    };

    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }

    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean | null | undefined }, message: Transfer | BuyItem | SetPrice | ListOnSale | Deploy) {

        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Transfer') {
            body = beginCell().store(storeTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BuyItem') {
            body = beginCell().store(storeBuyItem(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetPrice') {
            body = beginCell().store(storeSetPrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ListOnSale') {
            body = beginCell().store(storeListOnSale(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }

        await provider.internal(via, { ...args, body: body });

    }

    async getGetItemData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getItemData', builder.build())).stack;
        const result = loadTupleItemData(source);
        return result;
    }

    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }

}