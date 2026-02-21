import { useState } from "react";
import { CheckCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function TripTable({ trips, onCompleteTrip, onDeleteTrip, onEditTrip }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [completingTrip, setCompletingTrip] = useState(null);
  const [endOdometer, setEndOdometer] = useState("");

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("dispatch")) {
      return "text-yellow-600 bg-yellow-50";
    } else if (statusLower.includes("progress")) {
      return "text-[#8B1E3F] bg-[#FDF2F5]";
    } else if (statusLower.includes("complete")) {
      return "text-green-600 bg-green-50";
    } else if (statusLower.includes("cancel")) {
      return "text-red-600 bg-red-50";
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

  const filteredTrips = trips.filter((trip) =>
    trip.trip_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.destination?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompleteClick = (trip) => {
    setCompletingTrip(trip);
    setEndOdometer(trip.start_odometer?.toString() || "");
  };

  const handleCompleteSubmit = () => {
    if (completingTrip && endOdometer) {
      onCompleteTrip(completingTrip.id, parseFloat(endOdometer));
      setCompletingTrip(null);
      setEndOdometer("");
    }
  };

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
                Trip Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Origin
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Cargo (kg)
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
            {filteredTrips.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                  No trips found
                </td>
              </tr>
            ) : (
              filteredTrips.map((trip) => (
                <tr
                  key={trip.id}
                  className="hover:bg-[#FDF2F5] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                    {trip.trip_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {trip.origin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {trip.destination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {trip.cargo_weight_kg}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(trip.status)}`}>
                      {formatStatus(trip.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {trip.status !== "COMPLETED" && (
                        <>
                          <button
                            onClick={() => handleCompleteClick(trip)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Complete Trip"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </button>
                          {trip.status === "DISPATCHED" && (
                            <>
                              <button
                                onClick={() => onEditTrip(trip)}
                                className="p-2 text-[#8B1E3F] hover:bg-[#FDF2F5] rounded-lg transition-colors"
                                title="Edit"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteTrip(trip.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Complete Trip Modal */}
      {completingTrip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Complete Trip: {completingTrip.trip_code}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Odometer Reading (km)
              </label>
              <input
                type="number"
                step="0.01"
                value={endOdometer}
                onChange={(e) => setEndOdometer(e.target.value)}
                placeholder="Enter final odometer reading"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]"
                autoFocus
              />
              <p className="mt-1 text-xs text-gray-500">
                Start odometer: {completingTrip.start_odometer} km
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCompleteSubmit}
                disabled={!endOdometer || parseFloat(endOdometer) <= (completingTrip.start_odometer || 0)}
                className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Complete Trip
              </button>
              <button
                onClick={() => {
                  setCompletingTrip(null);
                  setEndOdometer("");
                }}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TripTable;
