import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "./Components/layout/DashboardLayout";
import ProtectedRoute from "./Components/common/ProtectedRoutes";
import SimulationDetails from "./pages/SimulationDetails";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Results from "./pages/Results";
import Simulation from "./pages/Simulation";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Loading";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgotpassword"
          element={<ForgotPassword />}
        />


        {/* =========================
            PROTECTED ROUTES
        ========================== */}

        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/history"
              element={<History />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/results"
              element={<Results />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="/simulation"
              element={<Simulation />}
            />

            <Route
              path="/simulation/:id"
              element={<SimulationDetails />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/help"
              element={<Help />}
            />

            <Route
              path="/loading"
              element={<Loading />}
            />

          </Route>

        </Route>


        {/* =========================
            404
        ========================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;