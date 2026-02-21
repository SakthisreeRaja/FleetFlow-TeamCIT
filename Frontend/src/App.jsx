import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Vehicles from "./pages/dashboard/Vehicles";
import Drivers from "./pages/dashboard/Drivers";
import Trips from "./pages/dashboard/Trips";
import Maintenance from "./pages/dashboard/Maintenance";
import Hiring from "./pages/dashboard/Hiring";
import Performance from "./pages/dashboard/Performance";
import Analytics from "./pages/dashboard/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout><Dashboard /></DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/vehicles"
        element={
          <ProtectedRoute>
            <DashboardLayout><Vehicles /></DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/drivers"
        element={
          <ProtectedRoute>
            <DashboardLayout><Drivers /></DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/trips"
        element={
          <ProtectedRoute>
            <DashboardLayout><Trips /></DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/maintenance"
        element={
          <ProtectedRoute>
            <DashboardLayout><Maintenance /></DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/hiring"
        element={
          <ProtectedRoute>
            <DashboardLayout><Hiring /></DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/performance"
        element={
          <ProtectedRoute>
            <DashboardLayout><Performance /></DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/analytics"
        element={
          <ProtectedRoute>
            <DashboardLayout><Analytics /></DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;