// import ContestCard from '@/components/contest/ContestCard';
// import Layout from '@/components/layout/Layout';
// import RightSIdeBar from '@/components/sidebar/RightSIdeBar';
// import { contestsData } from '@/lib/utils';
import React from 'react';
import { contestsData } from '../../lib/utils';
import Layout from '../../components/layout/Layout';
import RightSIdeBar from '../../components/sidebar/RightSIdeBar';

const page = () => {
    return (
        <Layout>
            <main id="site__main" className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
                <div className="lg:flex 2xl:gap-12 gap-8 max-w-[1065px] mx-auto" id="js-oversized">
                    <div className="max-w-[1080px] mx-auto ">
                        <div className="md:max-w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3">
                            <h1>Welcome TO contest</h1>
                            <div className="grid sm:grid-cols-3 grid-cols-2 gap-3">
                                {/* {contestsData.map((contest) => (
                                    <ContestCard key={contest.id} contest={contest} /> */}
                                {/* ))} */}
                            </div>
                        </div>
                    </div>
                    <RightSIdeBar />
                </div>
            </main>
        </Layout>
    );
};

export default page;