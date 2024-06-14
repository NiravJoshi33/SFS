'use client';
import React, { createContext, useState, useEffect, ReactNode, FC } from "react";
import { NftItem } from "../../contracts";
import { nftCollection } from "../../contracts";
import { useTonClient } from "../hooks/useTonClient";
import { useAsyncInitialize } from "../hooks/useAsyncInitialize";
import { useTonConnect } from "../hooks/useTonConnect";
import { Address, OpenedContract } from '@ton/core';
import { useTonConnectUI } from '@tonconnect/ui-react';

type Item = {
  itemAddress: string;
  tokenId: string;
  title: string;
  description: string;
  image: string;
  owner: string;
  onSale: boolean;
  price: bigint;
  collection_address: string;
};


interface TONContextValue {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  toggleModal: () => void;
  funPass: Item[];
}

interface TONContextProviderProps {
  children: ReactNode;
}

export const TONContext = createContext<TONContextValue | undefined>(undefined);

export const TONContextProvider: FC<TONContextProviderProps> = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [val, setVal] = useState<null | string>();
  const [funPass, setFunPass] = useState<Item[]>([]);
  console.log(funPass);

  const { sender } = useTonConnect();
  const [tonConnectUI] = useTonConnectUI();
  const client = useTonClient();

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };


  const NFTCollectionContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new nftCollection(
      Address.parse('EQDzbQTEbzQ-tEeXTrXO0_DKl95T1XvduhNwvsHsDCeLlV-T')
    );
    return client.open(contract) as OpenedContract<nftCollection>;
  }, [client]);


  useEffect(() => {
    readNftData();
  }, [tonConnectUI?.connected, NFTCollectionContract]);


  const readNftData = async () => {
    if (!NFTCollectionContract) return;
    const res = await NFTCollectionContract.getCurrentIndex();
    let index = Number(res);
    let newItems: Item[] = []; // Explicitly declaring the type of newItems
    if (index > 0) {
      for (let i = 0; i < index; i++) {
        let itemAddr = await NFTCollectionContract.getGetItemAddress(BigInt(i));
        let contract = new NftItem(itemAddr);
        let item = await client?.open(contract);
        const itemData = await item.getGetItemData();
        const res = await fetch(itemData.individual_content);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        newItems.push({
          itemAddress: itemAddr.toString(),
          tokenId: itemData.item_index.toString(),
          title: data.name,
          description: data.description,
          image: "https://maroon-annoyed-dinosaur-120.mypinata.cloud/ipfs/Qma9nfExcmCJ9VEbonXrRNYkwgKey1vV1yhExwLEkrzBSA",
          owner: itemData.owner.toString(),
          onSale: itemData.onSale,
          price: itemData.price,
          collection_address: itemData.collection_address.toString()
        });
      }
      setFunPass(newItems);
    }
  };






  return (
    <TONContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
        toggleModal,
        funPass
      }}
    >
      {children}
    </TONContext.Provider>
  );
};
