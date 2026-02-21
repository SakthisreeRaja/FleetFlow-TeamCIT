function FuelEfficiencyChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Fuel Efficiency Trend (km/L)
      </h3>
      
      <div className="relative h-64 flex items-end justify-between gap-4 border-b border-l border-gray-300 pb-2 pl-2">
        {/* Y-axis labels */}
        <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
          <span>20</span>
          <span>15</span>
          <span>10</span>
          <span>5</span>
          <span>0</span>
        </div>

        {/* Chart bars */}
        <div className="flex-1 flex items-end justify-between gap-2">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-blue-500 rounded-t" style={{ height: "60%" }}></div>
            <span className="text-xs text-gray-600">Jan - Dec</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-orange-500 rounded-t" style={{ height: "45%" }}></div>
            <span className="text-xs text-gray-600">Jan - Dec</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-gray-500 rounded-t" style={{ height: "75%" }}></div>
            <span className="text-xs text-gray-600">Jan - Dec</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600">Vehicle 1</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-gray-600">Vehicle 2</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded"></div>
          <span className="text-gray-600">Average</span>
        </div>
      </div>
    </div>
  );
}

export default FuelEfficiencyChart;
