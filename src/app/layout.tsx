'use client'
import { Inter } from "next/font/google";
import "./globals.css"; 
import React from "react";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { FarcasterContextProvider } from "../context/farcaster";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
 
    <html lang="en">
      <body className={inter.className}>
      <TonConnectUIProvider manifestUrl='https://sfs-manifest.vercel.app/tonconnect-manifest.json'>
        <FarcasterContextProvider>
          {children}
        </FarcasterContextProvider>
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
