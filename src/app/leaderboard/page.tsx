import React from 'react';
import Leaderboard from '../../components/leaderboard/LeaderbordCard';
import Layout from '../../components/layout/Layout';

const Page = () => {
    return (
        <Layout>
            <main id="site__main" className="2xl:ml-[--w-side] xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
                <div className="lg:flex 2xl:gap-12 gap-8 max-w-[1065px] mx-auto" id="js-oversized">
                    <div className="w-full">
                        <Leaderboard />
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Page;
