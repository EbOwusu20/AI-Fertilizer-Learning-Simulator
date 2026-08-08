import React from 'react'
import {
    Home, Sprout, Info, Settings, FileText,
    BarChart, History, FileQuestionMarkIcon
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        // { name: 'About', path: '/about', icon: Info },
        { name: 'Simulation', path: '/simulation', icon: Sprout },
        { name: 'Results', path: '/results', icon: BarChart },
        { name: 'History', path: '/history', icon: History },
        { name: 'Settings', path: '/settings', icon: Settings },
        { name: 'Help', path: '/help', icon: FileQuestionMarkIcon },
    ];

    return (
        <aside className='bg-white w-64 min-h-screen border-r p-5'>
            <h2 className='text-2xl font-bold text-green-700 mb-8'>Menu</h2>

            <nav className='space-y-2'>
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-4 py-3 transition rounded-xl 
                            ${isActive ? 'bg-green-600 text-white' : 'hover:bg-green-100 text-gray-700'
                                }`
                            }>
                            <Icon className='w-5 h-5' />
                            <span>{item.name}</span>
                        </NavLink>
                    )
                })}
            </nav>
        </aside>
    )
}

export default Sidebar
