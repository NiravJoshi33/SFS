'use client';
import Layout from "../components/layout/Layout";
// import RightSIdeBar from "../components/sidebar/RightSIdeBar";

import StickyHeader from "../components/header/StickyHeader"
import CreatePostModal from "../components/modals/CreatePostModal"
import React from "react";
import EntryPass from "./entrypass/page";

import RightSIdeBar from "../components/sidebar/RightSIdeBar";

const manifestUrl = 'https://sfs-manifest.vercel.app/tonconnect-manifest.json';

export default function Home() {

  return (


    <Layout>
      <main id="site__main" className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
        <div className="lg:flex 2xl:gap-12 max-w-[1065px] mx-auto" id="js-oversized">
          <div className="max-w-[1080px] mx-auto">
            <div className="md:max-w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3">
              <StickyHeader />
            </div>
          </div>
          {/* <RightSIdeBar />  */}
        </div>
      </main>
      {/* <CreatePostModal isOpen={false} toggleModal={function (): void {
        throw new Error("Function not implemented.");
      } } /> */}
    </Layout>


  );
}
