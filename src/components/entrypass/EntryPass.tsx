import React from 'react'
import EntryPassCards from './EntrypassCards';


const EntryPass = () => {
    return (
        <main id="site__main" className="2xl:ml-[--w-side] xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
        <div className="lg:flex 2xl:gap-12 max-w-[1600px] mx-auto" id="js-oversized">
            <div className="max-w-[1600px] mx-auto">
                <div className="md:max-w-[1200px] mx-auto flex-1 xl:space-y-6 space-y-3">
                    <EntryPassCards />
                </div>
            </div>
        </div>
    </main>
    
    )
}
export default EntryPass;