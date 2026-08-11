import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex">

            {/* Left Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-green-700 text-white relative overflow-hidden">

                <div className="absolute inset-0 bg-linear-to-br from-green-800 to-green-600" />

                <div className="relative z-10 flex flex-col justify-center px-16">

                    <Link to="/" className="flex items-center gap-3 mb-10">
                        <Leaf size={40} />

                        <div>
                            <h1 className="text-3xl font-bold">Fertilizer AI</h1>
                            <p className="text-green-100 text-sm">Learning Simulator</p>
                        </div>

                    </Link>

                    <h2 className="text-5xl font-bold leading-tight">
                        Smarter Farming.
                        <br />
                        Better Decisions.
                    </h2>

                    <p className="mt-6 text-green-100 text-lg max-w-lg leading-relaxed">
                        Explore intelligent fertilizer recommendations,
                        simulate farming conditions, and make data-driven
                        decisions for better crop performance.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <p className="text-2xl font-bold">AI</p>
                            <p className="text-sm text-green-100">Powered Recommendations</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <p className="text-2xl font-bold">24/7</p>
                            <p className="text-sm text-green-100">Learning Simulator</p>
                        </div>

                    </div>

                </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">

                <div className="w-full max-w-md">

                    {/* Mobile Logo */}
                    <Link
                        to="/"
                        className="lg:hidden flex items-center justify-center gap-2 mb-8"
                    >
                        <Leaf className="text-green-600" size={32} />

                        <span className="font-bold text-2xl text-green-700">
                            Fertilizer AI
                        </span>
                    </Link>

                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-bold text-gray-900">
                            {title}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {subtitle}
                        </p>

                    </div>

                    {children}

                </div>

            </div>

        </div>
    );
};

export default AuthLayout;