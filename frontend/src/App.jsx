import React from 'react'
// import Navbar from './Components/common/layout/Navbar'
// import Sidebar from './Components/common/layout/Sidebar'
// import Button from './Components/common/Button'
import DashboardLayout from './Components/layout/DashboardLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Reports from './pages/Reports'
import Login from './pages/Login'
import Results from './pages/Results'
import Simulation from './pages/Simulation'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Help from './pages/Help'
import NotFound from './pages/NotFound'
import Loading from './pages/Loading'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={<Landing />} />
        <Route path="/login"
          element={<Login />} />
        <Route path="/register"
          element={<Register />} />
        <Route path="/forgotpassword"
          element={<ForgotPassword />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard"
            element={<Dashboard />} />
          <Route path="/history"
            element={<History />} />
          <Route path="/reports"
            element={<Reports />} />
          <Route path="/results"
            element={<Results />} />
          <Route path="/settings"
            element={<Settings />} />
          <Route path="/simulation"
            element={<Simulation />} />
          <Route path="/profile"
            element={<Profile />} />
          <Route path="/*"
            element={<NotFound />} />
          <Route path="/help"
            element={<Help />} />
          <Route path='/loading'
            element={<Loading />} />
        </Route>
      </Routes>

      {/* <DashboardLayout>
          <h2 className='text-4xl font-bold'>Dashboard</h2>
          <p className='text-gray-600 mt-4'>Welcome to the AI-Powered Fertilizer Learning Simulator</p>
        </DashboardLayout> */}
    </BrowserRouter>
  )
}

export default App
