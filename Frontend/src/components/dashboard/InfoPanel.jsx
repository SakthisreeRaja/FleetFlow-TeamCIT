function InfoPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xl font-semibold text-gray-800">Dashboard Guide</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          A quick overview to help you understand your fleet management dashboard.
        </p>
        <div className="inline-block px-3 py-1.5 bg-[#FDF2F5] text-[#8B1E3F] text-xs font-medium rounded-lg border border-[#8B1E3F]/20">
          Fleet Manager
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-3">
            Key Performance Indicators
          </h4>
        </div>

        <div className="space-y-4 text-sm">
          <div className="p-3 rounded-lg bg-[#FDF2F5]">
            <p className="font-medium text-[#8B1E3F] mb-1">Active Fleet</p>
            <p className="text-gray-600">Current vehicles operating on the road</p>
          </div>

          <div className="p-3 rounded-lg bg-yellow-50">
            <p className="font-medium text-yellow-600 mb-1">Maintenance Alerts</p>
            <p className="text-gray-600">Vehicles requiring service or repairs</p>
          </div>

          <div className="p-3 rounded-lg bg-orange-50">
            <p className="font-medium text-orange-600 mb-1">Pending Cargo</p>
            <p className="text-gray-600">Shipments awaiting driver assignment</p>
          </div>

          <div className="p-3 rounded-lg bg-green-50">
            <p className="font-medium text-green-600 mb-1">Utilization Rate</p>
            <p className="text-gray-600">Fleet efficiency and usage percentage</p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">
            Quick Filters
          </h4>
          <p className="text-sm text-gray-500 mb-3">
            Refine your view with these options:
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#8B1E3F] mt-0.5">•</span>
              <span>Filter by vehicle type (trucks, vans)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#8B1E3F] mt-0.5">•</span>
              <span>View by status (Ready, Busy, Maintenance)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InfoPanel;
