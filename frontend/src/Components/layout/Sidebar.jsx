import {
  Home,
  Sprout,
  Settings,
  BarChart,
  History,
  FileQuestionMarkIcon,
  LogOut,
  User,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Simulation", path: "/simulation", icon: Sprout },
    { name: "Results", path: "/results", icon: BarChart },
    { name: "History", path: "/history", icon: History },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Help", path: "/help", icon: FileQuestionMarkIcon },
  ];

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/login");
  };

  const handleNavigation = () => {
    // Close sidebar only on mobile
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky
          top-0
          left-0
          z-50
          lg:z-auto

          w-64
          h-screen
          lg:min-h-screen

          bg-white
          dark:bg-gray-900

          border-r
          border-gray-200
          dark:border-gray-700

          p-5

          flex
          flex-col

          transition-transform
          duration-300

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
            Menu
          </h2>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="space-y-2 overflow-y-auto"
          aria-label="Dashboard navigation"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 transition rounded-xl ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "hover:bg-green-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition"
          >
            <LogOut className="w-5 h-5 shrink-0" />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;