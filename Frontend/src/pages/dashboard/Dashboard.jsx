import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardService, tripsService } from "../../services";
import KPICard from "../../components/dashboard/KPICard";
import FleetTable from "../../components/dashboard/FleetTable";
import {
  TruckIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChartBarIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

function Dashboard() {
  const navigate = useNavigate();
  const [kpiData, setKpiData] = useState({
    activeFleet: 0,
    maintenanceAlerts: 0,
    pendingCargo: 0,
    utilizationRate: 0,
  });
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard summary
      const summaryData = await dashboardService.getSummary();
      setKpiData({
        activeFleet: summaryData.active_fleet || 0,
        maintenanceAlerts: summaryData.maintenance_alerts || 0,
        pendingCargo: summaryData.pending_trips || 0,
        utilizationRate: summaryData.utilization_rate || 0,
      });

      // Fetch recent trips
      const tripsData = await tripsService.getTrips();
      setTrips(tripsData.slice(0, 6)); // Show only first 6 trips
      
      setError("");
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1E3F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Fleet Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/dashboard/trips')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium">
            <PlusIcon className="w-4 h-4" />
            New Trip
          </button>
          <button 
            onClick={() => navigate('/dashboard/vehicles')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-[#FDF2F5] hover:text-[#8B1E3F] hover:border-[#8B1E3F] transition-all duration-200 text-sm font-medium">
            <PlusIcon className="w-4 h-4" />
            New Vehicle
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Active Fleet"
            value={kpiData.activeFleet}
            icon={TruckIcon}
            color="primary"
          />
          <KPICard
            title="Maintenance Alert"
            value={kpiData.maintenanceAlerts}
            icon={ExclamationTriangleIcon}
            color="yellow"
          />
          <KPICard
            title="Pending Cargo"
            value={kpiData.pendingCargo}
            icon={ClockIcon}
            color="orange"
          />
          <KPICard
            title="Utilization Rate"
            value={`${kpiData.utilizationRate}%`}
            icon={ChartBarIcon}
            color="green"
          />
        </div>

        {/* Fleet Table */}
        <FleetTable trips={trips} />
      </div>
    </div>
  );
}

export default Dashboard;
