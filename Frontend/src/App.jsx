import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Vehicles from "./pages/dashboard/Vehicles";
import Trips from "./pages/dashboard/Trips";
import Maintenance from "./pages/dashboard/Maintenance";
import Hiring from "./pages/dashboard/Hiring";
import Performance from "./pages/dashboard/Performance";
import Analytics from "./pages/dashboard/Analytics";

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
      <Route path="/dashboard/vehicles" element={<DashboardLayout><Vehicles /></DashboardLayout>} />
      <Route path="/dashboard/trips" element={<DashboardLayout><Trips /></DashboardLayout>} />
      <Route path="/dashboard/maintenance" element={<DashboardLayout><Maintenance /></DashboardLayout>} />
      <Route path="/dashboard/hiring" element={<DashboardLayout><Hiring /></DashboardLayout>} />
      <Route path="/dashboard/performance" element={<DashboardLayout><Performance /></DashboardLayout>} />
      <Route path="/dashboard/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
    </Routes>
  );
}

export default App;