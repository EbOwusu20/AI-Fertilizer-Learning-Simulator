import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Sprout, DollarSign, Leaf } from "lucide-react";

import Card from "../Components/common/Card";
import { getSimulation } from "../services/api";

const SimulationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [simulation, setSimulation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadSimulation = async () => {
            try {
                setLoading(true);

                const data = await getSimulation(id);

                setSimulation(data);
            } catch (err) {
                setError(
                    err.message ||
                    "Unable to load simulation."
                );
            } finally {
                setLoading(false);
            }
        };

        loadSimulation();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-600 mb-5">
                    {error}
                </p>

                <button
                    onClick={() => navigate("/history")}
                    className="px-5 py-3 bg-green-600 text-white rounded-xl"
                >
                    Back to History
                </button>
            </div>
        );
    }

    if (!simulation) {
        return null;
    }

    const result = simulation.result_data;
    const input = simulation.input_data;

    const optimization =
        result?.optimization_result;

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Simulation Result
                    </h1>

                    <p className="text-gray-500 mt-1">
                        {simulation.crop} •{" "}
                        {new Date(
                            simulation.created_at
                        ).toLocaleString()}
                    </p>
                </div>

                <button
                    onClick={() => navigate("/history")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

            </div>


            {/* Main Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <Card className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Sprout className="text-green-700" />
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Predicted Yield
                            </p>

                            <h2 className="text-2xl font-bold">
                                {simulation.predicted_yield}
                            </h2>
                        </div>
                    </div>
                </Card>


                <Card className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <DollarSign className="text-yellow-700" />
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Expected Profit
                            </p>

                            <h2 className="text-2xl font-bold">
                                {simulation.profit}
                            </h2>
                        </div>
                    </div>
                </Card>


                <Card className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Leaf className="text-blue-700" />
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Environmental Score
                            </p>

                            <h2 className="text-2xl font-bold">
                                {simulation.environmental_score}
                            </h2>
                        </div>
                    </div>
                </Card>

            </div>


            {/* Recommendation */}
            <Card className="p-6">

                <h2 className="text-xl font-semibold mb-4">
                    AI Recommendation
                </h2>

                <p className="text-gray-700">
                    {result?.recommendation ||
                        "No recommendation available."}
                </p>

            </Card>


            {/* Optimization */}
            {optimization && (
                <Card className="p-6">

                    <h2 className="text-xl font-semibold mb-6">
                        Fertilizer Optimization
                    </h2>

                    <div className="grid md:grid-cols-3 gap-5">

                        <div>
                            <p className="text-gray-500">
                                Recommended Nitrogen
                            </p>

                            <p className="text-xl font-semibold">
                                {optimization.recommended_nitrogen}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Recommended Phosphorus
                            </p>

                            <p className="text-xl font-semibold">
                                {optimization.recommended_phosphorus}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Recommended Potassium
                            </p>

                            <p className="text-xl font-semibold">
                                {optimization.recommended_potassium}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Expected Yield
                            </p>

                            <p className="text-xl font-semibold">
                                {optimization.expected_yield}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Expected Profit
                            </p>

                            <p className="text-xl font-semibold">
                                {optimization.expected_profit}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Optimization Score
                            </p>

                            <p className="text-xl font-semibold">
                                {optimization.optimization_score}
                            </p>
                        </div>

                    </div>

                </Card>
            )}


            {/* Simulation Inputs */}
            <Card className="p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Simulation Inputs
                </h2>

                <div className="grid md:grid-cols-3 gap-5">

                    <div>
                        <p className="text-gray-500">
                            Crop
                        </p>
                        <p className="font-semibold">
                            {input?.crop}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Region
                        </p>
                        <p className="font-semibold">
                            {input?.region}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Season
                        </p>
                        <p className="font-semibold">
                            {input?.season}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Soil Type
                        </p>
                        <p className="font-semibold">
                            {input?.soil_type}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Soil pH
                        </p>
                        <p className="font-semibold">
                            {input?.soil_ph}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Fertilizer Type
                        </p>
                        <p className="font-semibold">
                            {input?.fertilizer_type}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Nitrogen
                        </p>
                        <p className="font-semibold">
                            {input?.nitrogen} kg/ha
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Phosphorus
                        </p>
                        <p className="font-semibold">
                            {input?.phosphorus} kg/ha
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Potassium
                        </p>
                        <p className="font-semibold">
                            {input?.potassium} kg/ha
                        </p>
                    </div>

                </div>

            </Card>


            {/* Analysis */}
            {result?.analysis && (
                <Card className="p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Environmental Analysis
                    </h2>

                    <div className="space-y-3">
                        {Array.isArray(result.analysis)
                            ? result.analysis.map(
                                (reason, index) => (
                                    <p
                                        key={index}
                                        className="text-gray-700"
                                    >
                                        • {reason}
                                    </p>
                                )
                            )
                            : (
                                <p className="text-gray-700">
                                    {result.analysis}
                                </p>
                            )}
                    </div>

                </Card>
            )}

        </div>
    );
};

export default SimulationDetails;