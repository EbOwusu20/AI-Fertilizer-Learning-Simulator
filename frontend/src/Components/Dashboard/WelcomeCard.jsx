import React from "react";
import { CalendarDays } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const WelcomeCard = () => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-linear-to-r from-green-700 to-green-500 text-white rounded-2xl p-8 shadow-md">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Welcome, {user?.name || "there"}!
          </h1>

          <p className="mt-2 text-green-100">
            Explore the features of the Fertilizer AI Learning Simulator
          </p>

        </div>

        <div className="flex items-center gap-2">
          <CalendarDays />
          <span>{today}</span>
        </div>

      </div>

    </div>
  );
};

export default WelcomeCard;