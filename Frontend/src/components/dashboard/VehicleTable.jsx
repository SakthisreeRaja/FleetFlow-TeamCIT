import { useState } from "react";
import { PencilIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

function VehicleTable({ vehicles, onViewVehicle, onEditVehicle, onDeleteVehicle }) {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "ready":
        return "text-green-600 bg-green-50";
      case "on trip":
        return "text-[#8B1E3F] bg-[#FDF2F5]";
      case "maintenance":
        return "text-yellow-600 bg-yellow-50";
      case "in shop":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
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
                NO.
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Plate
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Odometer
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredVehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="hover:bg-[#FDF2F5] transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                  {vehicle.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {vehicle.plate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {vehicle.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {vehicle.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {vehicle.odometer} km
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewVehicle(vehicle)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditVehicle(vehicle)}
                      className="p-2 text-[#8B1E3F] hover:bg-[#FDF2F5] rounded-lg transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteVehicle(vehicle.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleTable;
