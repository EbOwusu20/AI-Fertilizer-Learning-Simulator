import { Leaf, Brain, Sprout, Target, GraduationCap } from "lucide-react";

const About = () => {
    return (
        <section
            id="about"
            className="py-24 bg-white"
        >
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto">

                    <span className="inline-flex items-center gap-2 px-4 py-2 
                    rounded-full bg-green-50 text-green-700 text-sm font-semibold">
                        <Leaf size={16} />
                        About Fertilizer AI
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5">
                        Making Fertilizer Decisions
                        <span className="text-green-600">
                            {" "}Smarter
                        </span>
                    </h2>

                    <p className="text-gray-600 text-lg mt-6 leading-relaxed">
                        The AI Fertilizer Learning Simulator is an intelligent
                        learning platform designed to help users understand how
                        soil conditions, crop characteristics, and environmental
                        factors influence fertilizer recommendations.
                    </p>

                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-14 items-center mt-16">

                    {/* Visual Side */}
                    <div className="relative">

                        <div className="bg-green-700 rounded-3xl p-8 md:p-12 text-white">

                            <div className="w-16 h-16 rounded-2xl bg-white/10 
                            flex items-center justify-center mb-8">
                                <Brain size={34} />
                            </div>

                            <h3 className="text-3xl font-bold">
                                Agriculture Meets Artificial Intelligence
                            </h3>

                            <p className="text-green-100 mt-5 leading-relaxed">
                                Our simulator combines agricultural concepts with
                                artificial intelligence to provide an interactive
                                environment for exploring fertilizer recommendations
                                and their potential impact on crop performance.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-10">

                                <div className="bg-white/10 rounded-xl p-5">
                                    <Sprout size={25} />
                                    <p className="font-semibold mt-3">
                                        Smart Farming
                                    </p>
                                    <p className="text-sm text-green-100 mt-1">
                                        Data-driven agricultural decisions.
                                    </p>
                                </div>

                                <div className="bg-white/10 rounded-xl p-5">
                                    <Target size={25} />
                                    <p className="font-semibold mt-3">
                                        Better Decisions
                                    </p>
                                    <p className="text-sm text-green-100 mt-1">
                                        Understand fertilizer requirements.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Text Side */}
                    <div>

                        <h3 className="text-3xl font-bold text-gray-900">
                            What is the Learning Simulator?
                        </h3>

                        <p className="text-gray-600 mt-5 leading-relaxed">
                            Fertilizer AI provides a simulation environment where
                            users can enter agricultural parameters and explore
                            fertilizer recommendations generated from those inputs.
                        </p>

                        <p className="text-gray-600 mt-4 leading-relaxed">
                            Rather than simply providing a recommendation, the
                            platform is designed to help users understand the
                            relationship between soil nutrients, crop type,
                            environmental conditions, and fertilizer application.
                        </p>

                        {/* Mission */}
                        <div className="flex gap-4 mt-8">

                            <div className="shrink-0 w-12 h-12 rounded-xl bg-green-100 flex 
                            items-center justify-center">
                                <Target
                                    size={24}
                                    className="text-green-600"
                                />
                            </div>

                            <div>
                                <h4 className="font-semibold text-lg">
                                    Our Mission
                                </h4>

                                <p className="text-gray-600 mt-1">
                                    To make agricultural decision-making more
                                    understandable, accessible, and data-driven
                                    through AI-powered simulation.
                                </p>
                            </div>

                        </div>

                        {/* Learning */}
                        <div className="flex gap-4 mt-6">

                            <div className="shrink-0 w-12 h-12 rounded-xl bg-green-100 
                            flex items-center justify-center">
                                <GraduationCap
                                    size={24}
                                    className="text-green-600"
                                />
                            </div>

                            <div>
                                <h4 className="font-semibold text-lg">
                                    Built for Learning
                                </h4>

                                <p className="text-gray-600 mt-1">
                                    Users can experiment with different farming
                                    conditions and learn how changes in their inputs
                                    affect fertilizer recommendations.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default About;