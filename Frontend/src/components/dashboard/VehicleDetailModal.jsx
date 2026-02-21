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
          <div className="text-center pb-6 border-b border-gray-200">
            <div className="text-sm text-gray-500 mb-2">
              What it's for: This is your digital garage. It's the place where you add, view, change, or remove every vehicle your company owns.
            </div>
            <div className="text-sm text-gray-500">The Details You Track:</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F4F6F9] rounded-lg">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Name/Model
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.model}</p>
              <p className="text-xs text-gray-500 mt-1">The specific name/make of the vehicle</p>
            </div>

            <div className="p-4 bg-[#F4F6F9] rounded-lg">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                License Plate
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.plate}</p>
              <p className="text-xs text-gray-500 mt-1">The unique ID for each vehicle across the app</p>
            </div>

            <div className="p-4 bg-[#F4F6F9] rounded-lg">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Type
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.type}</p>
              <p className="text-xs text-gray-500 mt-1">Classification of the vehicle</p>
            </div>

            <div className="p-4 bg-[#F4F6F9] rounded-lg">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Max Load Capacity
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.maxPayload || "N/A"}</p>
              <p className="text-xs text-gray-500 mt-1">How much weight this vehicle can safely carry (in kg or tons)</p>
            </div>

            <div className="p-4 bg-[#F4F6F9] rounded-lg md:col-span-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Odometer
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.odometer} km</p>
              <p className="text-xs text-gray-500 mt-1">The current mileage on the vehicle's dashboard</p>
            </div>

            <div className="p-4 bg-[#F4F6F9] rounded-lg md:col-span-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Status
              </p>
              <p className="text-sm text-gray-800 font-medium">{vehicle.status}</p>
              <p className="text-xs text-gray-500 mt-1">Current operational status</p>
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
