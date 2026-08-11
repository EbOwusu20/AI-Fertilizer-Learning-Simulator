import React from 'react'
import { Bell, Leaf, UserCircle } from 'lucide-react'

const Navbar = () => {
    return (
        <nav className='bg-white shadow-sm flex items-center justify-between border-b'>
            <div className='flex items-center gap-3'>
                <Leaf className='text-green-600 w-8 h-8' />
                <div>
                    <h1 className='font-bold text-green-700 text-xl'>Fertilizer AI</h1>
                    <p className='text-sm text-gray-500'>Learning Simulator</p>
                </div>
            </div>

            <div className='flex items-center gap-3'>
                <button className='relative'>
                    <Bell className='w-6 h-6 text-gray-700 hover:text-green-600 transition' />
                    <span className='absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2'></span>
                </button>

                <div className='flex items-center gap-2'>
                    <UserCircle className='w-9 h-9 text-green-700'></UserCircle>
                    <div>
                        <h2 className='font-semibold '>Nana Ampem</h2>
                        <p className='text-sm text-gray-500'>Student</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
