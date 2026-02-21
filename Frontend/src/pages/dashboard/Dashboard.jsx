import { useState } from "react";
import KPICard from "../../components/dashboard/KPICard";
import FleetTable from "../../components/dashboard/FleetTable";
import InfoPanel from "../../components/dashboard/InfoPanel";
import {
  TruckIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChartBarIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

function Dashboard() {
  const [kpiData] = useState({
    activeFleet: 220,
    maintenanceAlerts: 180,
    pendingCargo: 20,
    utilizationRate: 75,
  });

  const [trips] = useState([
    { id: 1, vehicle: "TR-1234-ABC", driver: "John Doe", status: "On Trip" },
    { id: 2, vehicle: "TR-5678-DEF", driver: "Jane Smith", status: "Ready" },
    { id: 3, vehicle: "TR-9012-GHI", driver: "Mike Johnson", status: "Maintenance" },
    { id: 4, vehicle: "TR-3456-JKL", driver: "Sarah Williams", status: "On Trip" },
    { id: 5, vehicle: "TR-7890-MNO", driver: "David Brown", status: "Ready" },
    { id: 6, vehicle: "TR-2345-PQR", driver: "Emma Davis", status: "On Trip" },
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Fleet Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor and manage your fleet operations</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium">
            <PlusIcon className="w-4 h-4" />
            New Trip
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-[#FDF2F5] hover:text-[#8B1E3F] hover:border-[#8B1E3F] transition-all duration-200 text-sm font-medium">
            <PlusIcon className="w-4 h-4" />
            New Vehicle
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Section - KPIs and Table */}
        <div className="xl:col-span-2 space-y-6">
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

        {/* Right Section - Info Panel */}
        <div className="xl:col-span-1">
          <InfoPanel />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
