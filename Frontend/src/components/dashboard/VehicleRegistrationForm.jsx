import { useState } from "react";

function VehicleRegistrationForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      vehicle_code: "",
      license_plate: "",
      model: "",
      vehicle_type: "",
      max_capacity_kg: "",
      odometer_km: "0",
      acquisition_cost: "",
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert string values to numbers
    const dataToSubmit = {
      ...formData,
      max_capacity_kg: parseFloat(formData.max_capacity_kg),
      odometer_km: parseFloat(formData.odometer_km),
      acquisition_cost: parseFloat(formData.acquisition_cost),
    };
    
    onSubmit(dataToSubmit);
    
    // Reset form
    setFormData({
      vehicle_code: "",
      license_plate: "",
      model: "",
      vehicle_type: "",
      max_capacity_kg: "",
      odometer_km: "0",
      acquisition_cost: "",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        {initialData ? "Edit Vehicle" : "New Vehicle Registration"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Code
          </label>
          <input
            type="text"
            name="vehicle_code"
            value={formData.vehicle_code}
            onChange={handleChange}
            placeholder="e.g., VEH-001"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License Plate
          </label>
          <input
            type="text"
            name="license_plate"
            value={formData.license_plate}
            onChange={handleChange}
            placeholder="e.g., ABC-1234"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g., TATA LPT 2518"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Type
          </label>
          <select
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          >
            <option value="">Select type</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Trailer">Trailer</option>
            <option value="Pickup">Pickup</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Capacity (kg)
          </label>
          <input
            type="number"
            step="0.01"
            name="max_capacity_kg"
            value={formData.max_capacity_kg}
            onChange={handleChange}
            placeholder="e.g., 5000"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Odometer (km)
          </label>
          <input
            type="number"
            step="0.01"
            name="odometer_km"
            value={formData.odometer_km}
            onChange={handleChange}
            placeholder="e.g., 15000"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Acquisition Cost
          </label>
          <input
            type="number"
            step="0.01"
            name="acquisition_cost"
            value={formData.acquisition_cost}
            onChange={handleChange}
            placeholder="e.g., 2500000"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default VehicleRegistrationForm;
