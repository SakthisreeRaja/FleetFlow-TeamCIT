import { useState } from "react";

function TripForm({ onSubmit, onCancel, vehicles = [] }) {
  const [formData, setFormData] = useState({
    vehicle: "",
    cargoWeight: "",
    driver: "",
    originAddress: "",
    destination: "",
    estimatedFuelCost: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      vehicle: "",
      cargoWeight: "",
      driver: "",
      originAddress: "",
      destination: "",
      estimatedFuelCost: "",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">New Trip Form</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Vehicle:
          </label>
          <select
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          >
            <option value="">Choose a vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.plate}>
                {vehicle.plate} - {vehicle.model}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cargo Weight (kg):
          </label>
          <input
            type="number"
            name="cargoWeight"
            value={formData.cargoWeight}
            onChange={handleChange}
            placeholder="Enter cargo weight"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Driver:
          </label>
          <input
            type="text"
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            placeholder="Enter driver name"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Origin Address:
          </label>
          <input
            type="text"
            name="originAddress"
            value={formData.originAddress}
            onChange={handleChange}
            placeholder="Enter origin address"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination:
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter destination"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Fuel Cost:
          </label>
          <input
            type="number"
            name="estimatedFuelCost"
            value={formData.estimatedFuelCost}
            onChange={handleChange}
            placeholder="Enter estimated fuel cost"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-colors font-medium text-sm"
          >
            Confirm & Dispatch Trip
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TripForm;
