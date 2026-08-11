import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="pt-36 pb-24 bg-linear-to-br from-green-50 to-white">

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

                <div>

                    <span className="text-green-600 font-semibold">
                        AI Powered Agriculture
                    </span>

                    <h1 className="text-5xl font-bold leading-tight mt-4">

                        Smart Fertilizer

                        <span className="text-green-600">
                            {" "}Recommendations
                        </span>

                        <br />

                        for Better Farming

                    </h1>

                    <p className="mt-6 text-gray-600 text-lg">

                        Improve crop yield through intelligent fertilizer
                        recommendations powered by Artificial Intelligence
                        and machine learning.

                    </p>

                    <div className="mt-8 flex gap-5">

                        <Link
                            to="/login"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                        >
                            Get Started
                        </Link>

                        <a
                            href="#features"
                            className="border border-green-600 px-6 py-3 rounded-lg text-green-700"
                        >
                            Learn More
                        </a>

                    </div>

                </div>

                <div className="flex justify-center">

                    <img
                        src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800"
                        alt="Farm"
                        className="rounded-3xl shadow-xl"
                    />

                </div>

            </div>

        </section>
    );
};

export default Hero;