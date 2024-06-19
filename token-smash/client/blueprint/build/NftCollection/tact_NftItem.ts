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

export type LogEventMintRecord = {
    $$type: 'LogEventMintRecord';
    minter: Address;
    item_id: bigint;
    generate_number: bigint;
}

export function storeLogEventMintRecord(src: LogEventMintRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2743565669, 32);
        b_0.storeAddress(src.minter);
        b_0.storeInt(src.item_id, 257);
        b_0.storeInt(src.generate_number, 257);
    };
}

export function loadLogEventMintRecord(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2743565669) { throw Error('Invalid prefix'); }
    let _minter = sc_0.loadAddress();
    let _item_id = sc_0.loadIntBig(257);
    let _generate_number = sc_0.loadIntBig(257);
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function loadTupleLogEventMintRecord(source: TupleReader) {
    let _minter = source.readAddress();
    let _item_id = source.readBigNumber();
    let _generate_number = source.readBigNumber();
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function storeTupleLogEventMintRecord(source: LogEventMintRecord) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.minter);
    builder.writeNumber(source.item_id);
    builder.writeNumber(source.generate_number);
    return builder.build();
}

function dictValueParserLogEventMintRecord(): DictionaryValue<LogEventMintRecord> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLogEventMintRecord(src)).endCell());
        },
        parse: (src) => {
            return loadLogEventMintRecord(src.loadRef().beginParse());
        }
    }
}

export type MarketItemCreated = {
    $$type: 'MarketItemCreated';
    itemId: bigint;
    nftAddress: Address;
    seller: Address;
    owner: Address;
    price: bigint;
    isListed: boolean;
}

export function storeMarketItemCreated(src: MarketItemCreated) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1606873339, 32);
        b_0.storeInt(src.itemId, 257);
        b_0.storeAddress(src.nftAddress);
        b_0.storeAddress(src.seller);
        let b_1 = new Builder();
        b_1.storeAddress(src.owner);
        b_1.storeInt(src.price, 257);
        b_1.storeBit(src.isListed);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketItemCreated(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1606873339) { throw Error('Invalid prefix'); }
    let _itemId = sc_0.loadIntBig(257);
    let _nftAddress = sc_0.loadAddress();
    let _seller = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _owner = sc_1.loadAddress();
    let _price = sc_1.loadIntBig(257);
    let _isListed = sc_1.loadBit();
    return { $$type: 'MarketItemCreated' as const, itemId: _itemId, nftAddress: _nftAddress, seller: _seller, owner: _owner, price: _price, isListed: _isListed };
}

function loadTupleMarketItemCreated(source: TupleReader) {
    let _itemId = source.readBigNumber();
    let _nftAddress = source.readAddress();
    let _seller = source.readAddress();
    let _owner = source.readAddress();
    let _price = source.readBigNumber();
    let _isListed = source.readBoolean();
    return { $$type: 'MarketItemCreated' as const, itemId: _itemId, nftAddress: _nftAddress, seller: _seller, owner: _owner, price: _price, isListed: _isListed };
}

function storeTupleMarketItemCreated(source: MarketItemCreated) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.itemId);
    builder.writeAddress(source.nftAddress);
    builder.writeAddress(source.seller);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.price);
    builder.writeBoolean(source.isListed);
    return builder.build();
}

function dictValueParserMarketItemCreated(): DictionaryValue<MarketItemCreated> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMarketItemCreated(src)).endCell());
        },
        parse: (src) => {
            return loadMarketItemCreated(src.loadRef().beginParse());
        }
    }
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    query_id: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
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

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Cell;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3975404761, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3975404761) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload);
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

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Cell;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    query_id: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    query_id: bigint;
    index_id: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.index_id, 257);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index_id = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index_id);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type GetNftData = {
    $$type: 'GetNftData';
    is_initialized: boolean;
    index: bigint;
    collection_address: Address;
    owner_address: Address;
    individual_content: Cell;
}

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_initialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.individual_content);
    };
}

export function loadGetNftData(slice: Slice) {
    let sc_0 = slice;
    let _is_initialized = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadAddress();
    let _individual_content = sc_0.loadRef();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function loadTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _individual_content = source.readCell();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function storeTupleGetNftData(source: GetNftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.is_initialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection_address);
    builder.writeAddress(source.owner_address);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        }
    }
}

export type MarketItem = {
    $$type: 'MarketItem';
    index: bigint;
    nftContract: Address;
    seller: Address;
    owner: Address;
    price: bigint;
    isListed: boolean;
    sold: boolean;
}

export function storeMarketItem(src: MarketItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.nftContract);
        b_0.storeAddress(src.seller);
        let b_1 = new Builder();
        b_1.storeAddress(src.owner);
        b_1.storeInt(src.price, 257);
        b_1.storeBit(src.isListed);
        b_1.storeBit(src.sold);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketItem(slice: Slice) {
    let sc_0 = slice;
    let _index = sc_0.loadIntBig(257);
    let _nftContract = sc_0.loadAddress();
    let _seller = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _owner = sc_1.loadAddress();
    let _price = sc_1.loadIntBig(257);
    let _isListed = sc_1.loadBit();
    let _sold = sc_1.loadBit();
    return { $$type: 'MarketItem' as const, index: _index, nftContract: _nftContract, seller: _seller, owner: _owner, price: _price, isListed: _isListed, sold: _sold };
}

function loadTupleMarketItem(source: TupleReader) {
    let _index = source.readBigNumber();
    let _nftContract = source.readAddress();
    let _seller = source.readAddress();
    let _owner = source.readAddress();
    let _price = source.readBigNumber();
    let _isListed = source.readBoolean();
    let _sold = source.readBoolean();
    return { $$type: 'MarketItem' as const, index: _index, nftContract: _nftContract, seller: _seller, owner: _owner, price: _price, isListed: _isListed, sold: _sold };
}

function storeTupleMarketItem(source: MarketItem) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeAddress(source.nftContract);
    builder.writeAddress(source.seller);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.price);
    builder.writeBoolean(source.isListed);
    builder.writeBoolean(source.sold);
    return builder.build();
}

function dictValueParserMarketItem(): DictionaryValue<MarketItem> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMarketItem(src)).endCell());
        },
        parse: (src) => {
            return loadMarketItem(src.loadRef().beginParse());
        }
    }
}

export type Bought = {
    $$type: 'Bought';
    index: bigint;
    nftAddress: Address;
    price: bigint;
    seller: Address;
    buyer: Address;
}

export function storeBought(src: Bought) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1558595736, 32);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.nftAddress);
        b_0.storeInt(src.price, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.seller);
        b_1.storeAddress(src.buyer);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBought(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1558595736) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadIntBig(257);
    let _nftAddress = sc_0.loadAddress();
    let _price = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _seller = sc_1.loadAddress();
    let _buyer = sc_1.loadAddress();
    return { $$type: 'Bought' as const, index: _index, nftAddress: _nftAddress, price: _price, seller: _seller, buyer: _buyer };
}

function loadTupleBought(source: TupleReader) {
    let _index = source.readBigNumber();
    let _nftAddress = source.readAddress();
    let _price = source.readBigNumber();
    let _seller = source.readAddress();
    let _buyer = source.readAddress();
    return { $$type: 'Bought' as const, index: _index, nftAddress: _nftAddress, price: _price, seller: _seller, buyer: _buyer };
}

function storeTupleBought(source: Bought) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeAddress(source.nftAddress);
    builder.writeNumber(source.price);
    builder.writeAddress(source.seller);
    builder.writeAddress(source.buyer);
    return builder.build();
}

function dictValueParserBought(): DictionaryValue<Bought> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBought(src)).endCell());
        },
        parse: (src) => {
            return loadBought(src.loadRef().beginParse());
        }
    }
}

export type TokenCreated = {
    $$type: 'TokenCreated';
    sender: Address;
    nftAddress: Address;
}

export function storeTokenCreated(src: TokenCreated) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2888518294, 32);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.nftAddress);
    };
}

export function loadTokenCreated(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2888518294) { throw Error('Invalid prefix'); }
    let _sender = sc_0.loadAddress();
    let _nftAddress = sc_0.loadAddress();
    return { $$type: 'TokenCreated' as const, sender: _sender, nftAddress: _nftAddress };
}

function loadTupleTokenCreated(source: TupleReader) {
    let _sender = source.readAddress();
    let _nftAddress = source.readAddress();
    return { $$type: 'TokenCreated' as const, sender: _sender, nftAddress: _nftAddress };
}

function storeTupleTokenCreated(source: TokenCreated) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.sender);
    builder.writeAddress(source.nftAddress);
    return builder.build();
}

function dictValueParserTokenCreated(): DictionaryValue<TokenCreated> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenCreated(src)).endCell());
        },
        parse: (src) => {
            return loadTokenCreated(src.loadRef().beginParse());
        }
    }
}

export type Buy = {
    $$type: 'Buy';
    query_id: bigint;
    nftId: bigint;
}

export function storeBuy(src: Buy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2103842356, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.nftId, 257);
    };
}

export function loadBuy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2103842356) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _nftId = sc_0.loadIntBig(257);
    return { $$type: 'Buy' as const, query_id: _query_id, nftId: _nftId };
}

function loadTupleBuy(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _nftId = source.readBigNumber();
    return { $$type: 'Buy' as const, query_id: _query_id, nftId: _nftId };
}

function storeTupleBuy(source: Buy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.nftId);
    return builder.build();
}

function dictValueParserBuy(): DictionaryValue<Buy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBuy(src)).endCell());
        },
        parse: (src) => {
            return loadBuy(src.loadRef().beginParse());
        }
    }
}

export type ListOnSale = {
    $$type: 'ListOnSale';
    query_id: bigint;
    nftId: bigint;
    nftAddress: Address;
    price: bigint;
}

export function storeListOnSale(src: ListOnSale) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(777217439, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.nftId, 257);
        b_0.storeAddress(src.nftAddress);
        b_0.storeInt(src.price, 257);
    };
}

export function loadListOnSale(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 777217439) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _nftId = sc_0.loadIntBig(257);
    let _nftAddress = sc_0.loadAddress();
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'ListOnSale' as const, query_id: _query_id, nftId: _nftId, nftAddress: _nftAddress, price: _price };
}

function loadTupleListOnSale(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _nftId = source.readBigNumber();
    let _nftAddress = source.readAddress();
    let _price = source.readBigNumber();
    return { $$type: 'ListOnSale' as const, query_id: _query_id, nftId: _nftId, nftAddress: _nftAddress, price: _price };
}

function storeTupleListOnSale(source: ListOnSale) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.nftId);
    builder.writeAddress(source.nftAddress);
    builder.writeNumber(source.price);
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

 type NftItem_init_args = {
    $$type: 'NftItem_init_args';
    collection_address: Address;
    item_index: bigint;
}

function initNftItem_init_args(src: NftItem_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.collection_address);
        b_0.storeInt(src.item_index, 257);
    };
}

async function NftItem_init(collection_address: Address, item_index: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftItem_init_args({ $$type: 'NftItem_init_args', collection_address, item_index })(builder);
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
    8348: { message: `Invalid NFT ID or price` },
    27499: { message: `initialized tx need from collection` },
    28696: { message: `NFT not for sale` },
    49280: { message: `not owner` },
    49469: { message: `not from collection` },
    51526: { message: `Item already sold` },
    55154: { message: `Insufficient funds or not listed` },
    62742: { message: `non-sequential NFTs` },
}

const NftItem_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LogEventMintRecord","header":2743565669,"fields":[{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"generate_number","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"MarketItemCreated","header":1606873339,"fields":[{"name":"itemId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"nftAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"seller","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isListed","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"GetRoyaltyParams","header":1765620048,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportRoyaltyParams","header":2831876269,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":3975404761,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNftData","header":null,"fields":[{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"MarketItem","header":null,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"nftContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"seller","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"isListed","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sold","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"Bought","header":1558595736,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"nftAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"seller","type":{"kind":"simple","type":"address","optional":false}},{"name":"buyer","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenCreated","header":2888518294,"fields":[{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"nftAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Buy","header":2103842356,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"nftId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ListOnSale","header":777217439,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"nftId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"nftAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetPrice","header":2194120071,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const NftItem_getters: ABIGetter[] = [
    {"name":"get_nft_data","arguments":[],"returnType":{"kind":"simple","type":"GetNftData","optional":false}},
]

const NftItem_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Transfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetStaticData"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class NftItem implements Contract {
    
    static async init(collection_address: Address, item_index: bigint) {
        return await NftItem_init(collection_address, item_index);
    }
    
    static async fromInit(collection_address: Address, item_index: bigint) {
        const init = await NftItem_init(collection_address, item_index);
        const address = contractAddress(0, init);
        return new NftItem(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NftItem(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  NftItem_types,
        getters: NftItem_getters,
        receivers: NftItem_receivers,
        errors: NftItem_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Transfer | GetStaticData | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Transfer') {
            body = beginCell().store(storeTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetStaticData') {
            body = beginCell().store(storeGetStaticData(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetNftData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_nft_data', builder.build())).stack;
        const result = loadTupleGetNftData(source);
        return result;
    }
    
}