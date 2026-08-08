import {
    Brain,
    Sprout,
    BarChart3,
    History
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const Features = () => {

    const features = [

        {
            icon: <Brain size={40} />,
            title: "AI Recommendation",
            description:
                "Receive intelligent fertilizer recommendations powered by AI."
        },

        {
            icon: <Sprout size={40} />,
            title: "Soil Analysis",
            description:
                "Evaluate soil health before applying fertilizer."
        },

        {
            icon: <BarChart3 size={40} />,
            title: "Yield Prediction",
            description:
                "Predict expected crop performance before planting."
        },

        {
            icon: <History size={40} />,
            title: "Simulation History",
            description:
                "Access and compare all previous simulations."
        }

    ];

    return (

        <section
            id="features"
            className="py-24 bg-gray-50">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center">Powerful Features</h2>

                <p className="text-center text-gray-500 mt-4">
                    Everything you need to make smarter fertilizer decisions.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            {...feature} />
                    ))}

                </div>

            </div>

        </section>

    );
};

export default Features;