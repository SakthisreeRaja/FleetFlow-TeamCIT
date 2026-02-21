import { useState } from "react";

function VehicleRegistrationForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      licensePlate: "",
      maxPayload: "",
      initialOdometer: "",
      type: "",
      model: "",
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
    onSubmit(formData);
    // Reset form
    setFormData({
      licensePlate: "",
      maxPayload: "",
      initialOdometer: "",
      type: "",
      model: "",
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
            License Plate:
          </label>
          <input
            type="text"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            placeholder="Enter license plate"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Payload:
          </label>
          <input
            type="text"
            name="maxPayload"
            value={formData.maxPayload}
            onChange={handleChange}
            placeholder="e.g., 5000 kg"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Odometer:
          </label>
          <input
            type="number"
            name="initialOdometer"
            value={formData.initialOdometer}
            onChange={handleChange}
            placeholder="Enter initial odometer reading"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type:
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          >
            <option value="">Select vehicle type</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Trailer">Trailer</option>
            <option value="Pickup">Pickup</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model:
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Enter vehicle model"
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
