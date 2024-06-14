'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TONContextProvider } from "../context/tonContext";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <TonConnectUIProvider manifestUrl='https://maroon-annoyed-dinosaur-120.mypinata.cloud/ipfs/QmVYmkgPcDoHxuCfJAGRy8Y9qcBEMjLcHX2kvgRkKFYAsg'>
          <TONContextProvider>
            {children}
          </TONContextProvider>
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
