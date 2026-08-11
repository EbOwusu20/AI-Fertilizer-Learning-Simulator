import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const LandingNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

                <Link to="/" className="flex items-center gap-3">
                    <Leaf className="text-green-600" size={34} />

                    <div>
                        <h1 className="text-2xl font-bold text-green-700">Fertilizer AI</h1>
                        <p className="text-xs text-gray-500">Learning Simulator</p>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-8">

                    <a href="#features" className="hover:text-green-600">Features</a>
                    <a href="#how" className="hover:text-green-600">How It Works</a>
                    <a href="#about" className="hover:text-green-600">About</a>

                    <Link
                        to="/login"
                        className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                    >
                        Get Started
                    </Link>

                </div>

            </div>
        </nav>
    );
};

export default LandingNavbar;