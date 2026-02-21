import { useState } from "react";

function MaintenanceTable({ maintenanceLogs }) {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "done":
      case "completed":
        return "text-green-600 bg-green-50";
      case "new":
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "in progress":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const filteredLogs = maintenanceLogs.filter((log) =>
    log.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Fleet Flow</h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search bar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-[#F4F6F9] text-gray-800 placeholder-gray-500 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent text-sm"
          />
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm hover:bg-[#F4F6F9] transition-colors border border-gray-200">
            Group by
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm hover:bg-[#F4F6F9] transition-colors border border-gray-200">
            Filter
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm hover:bg-[#F4F6F9] transition-colors border border-gray-200">
            Sort by...
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F4F6F9]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Log ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Issue/Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-[#FDF2F5] transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                  {log.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {log.vehicle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {log.issue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {log.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {log.cost}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(log.status)}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintenanceTable;
