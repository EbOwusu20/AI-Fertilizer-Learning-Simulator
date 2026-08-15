import { useEffect, useState } from "react";
import { Sprout, DollarSign, Activity, TrendingUp } from "lucide-react";

import WelcomeCard from "../Components/Dashboard/WelcomeCard";
import StatCard from "../Components/Dashboard/StatCard";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(
          `${API_URL}/dashboard/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Failed to load dashboard."
          );
        }

        setStats(data);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <WelcomeCard />

      {/* STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Simulations"
          value={stats.total_simulations}
          icon={Sprout}
        />

        <StatCard
          title="Average Yield"
          value={`${stats.average_yield} T`}
          icon={TrendingUp}
        />

        <StatCard
          title="Total Profit"
          value={`$${stats.total_profit.toLocaleString()}`}
          icon={DollarSign}
        />

        <StatCard
          title="Environment Score"
          value={`${stats.average_environmental_score}%`}
          icon={Activity}
        />

      </div>

      {/* RECENT SIMULATIONS */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h2 className="text-xl font-semibold">
              Recent Simulations
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Your latest fertilizer simulations
            </p>
          </div>

        </div>

        {stats.recent_simulations.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <Sprout className="w-10 h-10 mx-auto mb-3 text-gray-300" />

            <p>
              You haven't run any simulations yet.
            </p>

            <p className="text-sm mt-1">
              Run your first simulation to see it here.
            </p>
          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead>
                <tr className="border-b text-left text-gray-500 text-sm">

                  <th className="pb-3">
                    Crop
                  </th>

                  <th className="pb-3">
                    Fertilizer
                  </th>

                  <th className="pb-3">
                    Yield
                  </th>

                  <th className="pb-3">
                    Profit
                  </th>

                  <th className="pb-3">
                    Environment
                  </th>

                </tr>
              </thead>

              <tbody>

                {stats.recent_simulations.map(
                  (simulation) => (

                    <tr
                      key={simulation.id}
                      className="border-b last:border-0"
                    >

                      <td className="py-4 font-medium">
                        {simulation.crop}
                      </td>

                      <td className="py-4">
                        {simulation.fertilizer}
                      </td>

                      <td className="py-4">
                        {Number(
                          simulation.yield
                        ).toFixed(2)} T
                      </td>

                      <td className="py-4">
                        $
                        {Number(
                          simulation.profit
                        ).toLocaleString()}
                      </td>

                      <td className="py-4">
                        {Number(
                          simulation.environmental_score
                        ).toFixed(1)}
                        %
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default Dashboard;