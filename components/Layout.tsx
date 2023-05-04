import React, { useState } from 'react'
import Navbar from './layout/Navbar'
import FollowBar from './layout/FollowBar'

interface LayoutProp {
    children: React.ReactNode
}

function Layout({ children }: LayoutProp) {
    return (
        <div className='bg-slate-200'>
            <div className="container mx-auto xl:px-30 max-w-6xl">
                <div className='hidden md:block'>
                    <Navbar />
                </div>
                <div className='xs:block md:hidden'>
                    <FollowBar />
                </div>
                <div className='grid grid-cols-6 h-screen'>
                    <div className='col-span-6 md:col-span-4 bg-violet-100 shadow-sm mt-4'>
                        {children}
                    </div>
                    <div className='hidden md:block md:col-span-2'>
                        <FollowBar />
                    </div>
                </div>
                <div className='md:hidden'>
                    <Navbar />
                </div>
            </div>

        </div>
    )
}

export default Layout