'use client'
import React from 'react';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
    return (
        <Layout>
            <main id="site__main" className="2xl:ml-[--w-side] xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
                <div className="lg:flex 2xl:gap-8 gap-6 max-w-[1065px] mx-auto" id="js-oversized">
                    <div className="flex-none w-full flex flex-col items-center">
                        <div className="page-heading mb-8">
                            <h1 className="page-title text-4xl font-bold">TOKEN $MASH</h1>
                        </div>
                        <Link href="https://t.me/tokensmashbot">

                            <Image
                                src="/assets/images/superplay/game.png"
                                alt="Token Smash"
                                layout="responsive"
                                width={720}
                                height={1280}
                                className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            />

                        </Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Page;
