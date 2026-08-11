import React, { Children } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Navbar />

                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>

                <Footer />

            </div>

        </div>
    );
};

export default DashboardLayout;
