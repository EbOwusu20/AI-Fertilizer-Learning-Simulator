import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main application */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Navbar */}
        <Navbar
          onMenuClick={() =>
            setMobileOpen((current) => !current)
          }
        />

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <Outlet />
        </main>

        <Footer />

      </div>
    </div>
  );
};

export default DashboardLayout;