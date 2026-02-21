import { useState, useEffect } from "react";
import { analyticsService } from "../../services";

function FuelEfficiencyChart() {
  const [fuelData, setFuelData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFuelEfficiency();
  }, []);

  const fetchFuelEfficiency = async () => {
    try {
      const data = await analyticsService.getFuelEfficiency();
      setFuelData(data.slice(0, 5)); // Show top 5 vehicles
    } catch (error) {
      console.error("Error fetching fuel efficiency:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Fuel Efficiency (km/L)
        </h3>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B1E3F]"></div>
        </div>
      </div>
    );
  }

  if (fuelData.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Fuel Efficiency (km/L)
        </h3>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No fuel data available</p>
        </div>
      </div>
    );
  }

  const maxEfficiency = Math.max(...fuelData.map(v => v.efficiency), 20);
  const getBarHeight = (efficiency) => {
    return `${(efficiency / maxEfficiency) * 100}%`;
  };

  const colors = ['bg-blue-500', 'bg-orange-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500'];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Fuel Efficiency (km/L)
      </h3>
      
      <div className="relative h-64 flex items-end justify-between gap-4 border-b border-l border-gray-300 pb-2 pl-2">
        {/* Y-axis labels */}
        <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
          <span>{Math.round(maxEfficiency)}</span>
          <span>{Math.round(maxEfficiency * 0.75)}</span>
          <span>{Math.round(maxEfficiency * 0.5)}</span>
          <span>{Math.round(maxEfficiency * 0.25)}</span>
          <span>0</span>
        </div>

        {/* Chart bars */}
        <div className="flex-1 flex items-end justify-between gap-2">
          {fuelData.map((vehicle, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className={`w-full ${colors[index % colors.length]} rounded-t transition-all duration-300`}
                style={{ height: getBarHeight(vehicle.efficiency) }}
                title={`${vehicle.efficiency} km/L`}
              ></div>
              <span className="text-xs text-gray-600 truncate w-full text-center" title={vehicle.vehicle}>
                {vehicle.vehicle}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        {fuelData.map((vehicle, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 ${colors[index % colors.length]} rounded`}></div>
            <span className="text-gray-600">{vehicle.vehicle}: {vehicle.efficiency} km/L</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FuelEfficiencyChart;
