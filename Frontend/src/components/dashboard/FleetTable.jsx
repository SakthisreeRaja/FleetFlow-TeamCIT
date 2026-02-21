function FleetTable({ trips }) {
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("dispatch") || statusLower.includes("progress") || statusLower.includes("on")) {
      return "text-[#8B1E3F] bg-[#FDF2F5]";
    } else if (statusLower.includes("complete") || statusLower.includes("ready")) {
      return "text-green-600 bg-green-50";
    } else if (statusLower.includes("maintenance") || statusLower.includes("shop")) {
      return "text-yellow-600 bg-yellow-50";
    }
    return "text-gray-600 bg-gray-50";
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status.replace(/_/g, " ").toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Fleet Overview</h3>
        <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm hover:bg-[#F4F6F9] transition-colors border border-gray-200">
          Sort by...
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F4F6F9]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Trip Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Origin
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trips.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                  No trips found
                </td>
              </tr>
            ) : (
              trips.map((trip) => (
                <tr
                  key={trip.id}
                  className="hover:bg-[#FDF2F5] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {trip.trip_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {trip.origin || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {trip.destination || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(trip.status)}`}>
                      {formatStatus(trip.status)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FleetTable;
