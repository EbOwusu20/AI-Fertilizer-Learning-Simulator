import { CheckCircle2, Circle, LoaderCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictFertilizer } from "../services/api";

const steps = [
  "Checking soil and farm conditions...",
  "Analyzing fertilizer inputs...",
  "Predicting crop yield...",
  "Calculating profit and environmental impact...",
  "Generating AI recommendation...",
];

const Loading = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("fertisim_pending_simulation");
    if (!raw) {
      navigate("/simulation", { replace: true });
      return;
    }

    let cancelled = false;
    const payload = JSON.parse(raw);

    const interval = setInterval(() => {
      setStep((current) => Math.min(current + 1, steps.length - 1));
    }, 500);

    const run = async () => {
      try {
        const result = await predictFertilizer(payload);
        if (cancelled) return;

        sessionStorage.removeItem("fertisim_pending_simulation");
        sessionStorage.setItem("fertisim_last_result", JSON.stringify({ input: payload, result }));
        navigate("/results", { replace: true });
      } catch (err) {
        if (!cancelled) setError(err.message || "Unable to run the simulation.");
      } finally {
        clearInterval(interval);
      }
    };

    run();

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg text-center">
          <XCircle className="w-16 h-16 text-red-600 mx-auto" />
          <h1 className="font-bold mt-6 text-3xl">Simulation failed</h1>
          <p className="text-gray-500 mt-3">{error}</p>
          <button
            onClick={() => navigate("/simulation")}
            className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white font-semibold"
          >
            Back to Simulation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="relative">
        <div className="absolute inset-0 bg-green-100 rounded-full blur-2xl opacity-60" />
        <LoaderCircle className="relative w-20 h-20 animate-spin text-green-700" />
      </div>
      <h1 className="font-bold mt-8 text-3xl md:text-4xl text-center">AI is analyzing your inputs...</h1>
      <p className="text-gray-500 text-center max-w-md mt-3">Please wait while FertSim runs the prediction model.</p>

      <div className="w-full max-w-xl mt-10 space-y-4">
        {steps.map((message, index) => (
          <div key={message} className="flex items-center gap-3">
            {index < step ? (
              <CheckCircle2 className="text-green-600 shrink-0" />
            ) : index === step ? (
              <LoaderCircle className="text-green-700 animate-spin shrink-0" />
            ) : (
              <Circle className="text-gray-300 shrink-0" />
            )}
            <span className={index <= step ? "text-gray-800" : "text-gray-400"}>{message}</span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-xl mt-8">
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 rounded-full transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <p className="text-sm text-gray-500 text-center mt-2">Running AI simulation...</p>
      </div>
    </div>
  );
};

export default Loading;
