import { XMarkIcon } from "@heroicons/react/24/outline";

function VehicleDetailModal({ vehicle, onClose }) {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">View Vehicle</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F4F6F9] rounded-lg">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Name/Model
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.model}</p>
            </div>

            <div className="p-4 bg-[#F4F6F9] rounded-lg">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                License Plate
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.license_plate || vehicle.plate}</p>
            </div>

            <div className="p-4 bg-[#F4F6F9] rounded-lg">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Type
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.vehicle_type || vehicle.type}</p>
            </div>

            <div className="p-4 bg-[#F4F6F9] rounded-lg">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Max Load Capacity
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.max_capacity_kg || vehicle.maxPayload || "N/A"} kg</p>
            </div>

            <div className="p-4 bg-[#F4F6F9] rounded-lg md:col-span-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Odometer
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.odometer_km || vehicle.odometer} km</p>
            </div>

            <div className="p-4 bg-[#F4F6F9] rounded-lg md:col-span-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Status
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.status}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-colors font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetailModal;
