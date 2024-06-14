'use client';
import React from 'react';
import Layout from '../../components/layout/Layout';
import Profile from '../../components/profile/Profile';
import EntryPass from '../../components/entrypass/EntryPass';
import { useEffect, useState } from 'react';
import { NftItem } from '../../../contracts';
import { nftCollection } from '../../../contracts';
import { useTonClient } from '../../hooks/useTonClient';
import { useAsyncInitialize } from '../../hooks/useAsyncInitialize';
import { useTonConnect } from '../../hooks/useTonConnect';
import { Address, OpenedContract } from '@ton/core';
import { useTonConnectUI } from '@tonconnect/ui-react';



const page = () => {

  return (

    <Layout>
      <EntryPass />
    </Layout>


  );
};

export default page;