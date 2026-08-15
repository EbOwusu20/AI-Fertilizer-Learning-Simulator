import { useEffect, useState } from "react";

import Searchbar from "../Components/History/Searchbar";
import FilterDropdown from "../Components/History/FilterDropdown";
import HistoryTable from "../Components/History/HistoryTable";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const History = () => {
  const [history, setHistory] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("access_token");

        const response = await fetch(
          `${API_URL}/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Failed to load history."
          );
        }

        setHistory(data);
      } catch (err) {
        setError(
          err.message ||
            "Something went wrong while loading history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // -----------------------------------------
  // Search + filter
  // -----------------------------------------

  const filteredHistory = history.filter((record) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      record.crop
        ?.toLowerCase()
        .includes(searchTerm) ||
      record.fertilizer
        ?.toLowerCase()
        .includes(searchTerm);

    const matchesFilter =
      filter === "All" ||
      record.crop === filter;

    return matchesSearch && matchesFilter;
  });

  // -----------------------------------------
  // Loading
  // -----------------------------------------

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
      </div>
    );
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Simulation History
          </h1>

          <p className="text-gray-500">
            View all previous fertilizer simulations.
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Simulation History
        </h1>

        <p className="text-gray-500">
          View all previous fertilizer simulations.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1">
          <Searchbar
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <FilterDropdown
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        />

      </div>

      {/* Empty state */}
      {history.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold">
            No simulations yet
          </h2>

          <p className="text-gray-500 mt-2">
            Run your first fertilizer simulation and
            it will appear here.
          </p>
        </div>
      ) : (
        <HistoryTable
          history={filteredHistory}
        />
      )}

    </div>
  );
};

export default History;