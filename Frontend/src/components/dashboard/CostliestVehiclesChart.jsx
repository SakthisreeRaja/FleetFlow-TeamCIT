function CostliestVehiclesChart() {
  const vehicles = [
    { name: "INJ-01", value: 80 },
    { name: "DEF-02", value: 65 },
    { name: "INJ-03", value: 45 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Top 5 Costliest Vehicles
      </h3>
      
      <div className="space-y-4">
        {vehicles.map((vehicle, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{vehicle.name}</span>
              <span className="text-gray-600">{vehicle.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#8B1E3F] h-3 rounded-full transition-all duration-300"
                style={{ width: `${vehicle.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Based on total fuel and maintenance costs
        </p>
      </div>
    </div>
  );
}

export default CostliestVehiclesChart;
