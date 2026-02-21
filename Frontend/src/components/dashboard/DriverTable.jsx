import { useState } from "react";

function DriverTable({ drivers }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.license.toLowerCase().includes(searchTerm.toLowerCase())
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                License#
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Expiry
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Completion Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Safety Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Complaints
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDrivers.map((driver, index) => (
              <tr
                key={index}
                className="hover:bg-[#FDF2F5] transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                  {driver.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {driver.license}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {driver.expiry}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: driver.completionRate }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{driver.completionRate}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
                      <div
                        className="bg-[#8B1E3F] h-2 rounded-full"
                        style={{ width: driver.safetyScore }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{driver.safetyScore}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {driver.complaints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DriverTable;
