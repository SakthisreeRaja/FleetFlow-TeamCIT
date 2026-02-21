import { useState } from "react";

function createInitialFormData(initialData = null) {
  return {
    trip_code: initialData?.trip_code || "",
    vehicle_id: initialData?.vehicle_id || "",
    driver_id: initialData?.driver_id || "",
    origin: initialData?.origin || "",
    destination: initialData?.destination || "",
    cargo_weight_kg: initialData?.cargo_weight_kg || "",
    revenue: initialData?.revenue || "",
  };
}

function TripForm({ onSubmit, onCancel, vehicles = [], drivers = [], initialData = null }) {
  const [formData, setFormData] = useState(() => createInitialFormData(initialData));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert string values to proper types
    const dataToSubmit = {
      trip_code: formData.trip_code,
      vehicle_id: formData.vehicle_id,
      driver_id: formData.driver_id,
      origin: formData.origin,
      destination: formData.destination,
      cargo_weight_kg: parseFloat(formData.cargo_weight_kg),
    };
    
    // Only include revenue if it has a value
    if (formData.revenue && formData.revenue !== "") {
      dataToSubmit.revenue = parseFloat(formData.revenue);
    }
    
    console.log("Form data to submit:", dataToSubmit);
    onSubmit(dataToSubmit);
    
    // Reset form if not editing
    if (!initialData) {
      setFormData(createInitialFormData());
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        {initialData ? "Edit Trip" : "New Trip Form"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trip Code
          </label>
          <input
            type="text"
            name="trip_code"
            value={formData.trip_code}
            onChange={handleChange}
            placeholder="e.g., TRIP-001"
            required
            disabled={!!initialData}
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Vehicle
          </label>
          <select
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleChange}
            required
            disabled={!!initialData}
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all disabled:bg-gray-100"
          >
            <option value="">Choose a vehicle</option>
            {vehicles.filter(v => v.status === "AVAILABLE" || v.id === formData.vehicle_id).map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.license_plate} - {vehicle.model} ({vehicle.vehicle_type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Driver
          </label>
          <select
            name="driver_id"
            value={formData.driver_id}
            onChange={handleChange}
            required
            disabled={!!initialData}
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all disabled:bg-gray-100"
          >
            <option value="">Choose a driver</option>
            {drivers.filter(d => 
              d.status === "OFF_DUTY" || 
              d.status === "ON_DUTY" || 
              d.id === formData.driver_id
            ).map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.full_name} - {driver.license_number} ({driver.status})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cargo Weight (kg)
          </label>
          <input
            type="number"
            step="0.01"
            name="cargo_weight_kg"
            value={formData.cargo_weight_kg}
            onChange={handleChange}
            placeholder="Enter cargo weight"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Origin Address
          </label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            placeholder="Enter origin address"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination
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
            Expected Revenue (Optional)
          </label>
          <input
            type="number"
            step="0.01"
            name="revenue"
            value={formData.revenue}
            onChange={handleChange}
            placeholder="Enter expected revenue"
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-colors font-medium text-sm"
          >
            {initialData ? "Update Trip" : "Confirm & Dispatch Trip"}
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
