import React from "react";
import { Bell, Leaf, UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const { user } = useAuth();

    return (
        <nav className="bg-white shadow-sm flex items-center justify-between border-b">
            
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
                <Leaf className="text-green-600 w-8 h-8" />

                <div>
                    <h1 className="font-bold text-green-700 text-xl">
                        Fertilizer AI
                    </h1>

                    <p className="text-sm text-gray-500">
                        Learning Simulator
                    </p>
                </div>
            </div>


            {/* Right Side */}
            <div className="flex items-center gap-3">

                {/* Notifications */}
                <button className="relative">
                    <Bell className="w-6 h-6 text-gray-700 hover:text-green-600 transition" />

                    <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
                </button>


                {/* Logged-in User */}
                <div className="flex items-center gap-2">

                    {user?.profile_image ? (
                        <img
                            src={user.profile_image}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                    ) : (
                        <UserCircle className="w-9 h-9 text-green-700" />
                    )}

                    <div>
                        <h2 className="font-semibold">
                            {user?.name || "User"}
                        </h2>

                        <p className="text-sm text-gray-500">
                            Student
                        </p>
                    </div>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;