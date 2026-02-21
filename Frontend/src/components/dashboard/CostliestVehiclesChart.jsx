import { useState, useEffect } from "react";
import { analyticsService } from "../../services";

function CostliestVehiclesChart() {
  const [vehicleCosts, setVehicleCosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicleCosts();
  }, []);

  const fetchVehicleCosts = async () => {
    try {
      const data = await analyticsService.getVehicleCosts();
      setVehicleCosts(data);
    } catch (error) {
      console.error("Error fetching vehicle costs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount.toFixed(0)}`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Top 5 Costliest Vehicles
        </h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B1E3F]"></div>
        </div>
      </div>
    );
  }

  if (vehicleCosts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Top 5 Costliest Vehicles
        </h3>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No cost data available</p>
        </div>
      </div>
    );
  }

  const maxCost = Math.max(...vehicleCosts.map(v => v.total_cost));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Top 5 Costliest Vehicles
      </h3>
      
      <div className="space-y-4">
        {vehicleCosts.map((vehicle) => {
          const percentage = maxCost > 0 ? (vehicle.total_cost / maxCost) * 100 : 0;
          return (
            <div key={vehicle.vehicle_id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">
                  {vehicle.license_plate}
                  <span className="text-xs text-gray-500 ml-2">({vehicle.vehicle_type})</span>
                </span>
                <span className="text-gray-600 font-semibold">{formatCurrency(vehicle.total_cost)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#8B1E3F] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                  title={`Fuel: ${formatCurrency(vehicle.fuel_cost)}, Maintenance: ${formatCurrency(vehicle.maintenance_cost)}, Expenses: ${formatCurrency(vehicle.expense_cost)}`}
                ></div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>Fuel: {formatCurrency(vehicle.fuel_cost)}</span>
                <span>•</span>
                <span>Maintenance: {formatCurrency(vehicle.maintenance_cost)}</span>
                <span>•</span>
                <span>Other: {formatCurrency(vehicle.expense_cost)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Based on total fuel, maintenance, and other expenses
        </p>
      </div>
    </div>
  );
}

export default CostliestVehiclesChart;
