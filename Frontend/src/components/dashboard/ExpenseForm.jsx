import { useState } from "react";

function ExpenseForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    tripId: "",
    driver: "",
    fuelCost: "",
    miscExpense: "",
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
      tripId: "",
      driver: "",
      fuelCost: "",
      miscExpense: "",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">New Expense</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trip ID:
          </label>
          <input
            type="text"
            name="tripId"
            value={formData.tripId}
            onChange={handleChange}
            placeholder="Enter trip ID"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Driver:
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
            Fuel Cost:
          </label>
          <input
            type="number"
            name="fuelCost"
            value={formData.fuelCost}
            onChange={handleChange}
            placeholder="Enter fuel cost"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Misc Expense:
          </label>
          <input
            type="number"
            name="miscExpense"
            value={formData.miscExpense}
            onChange={handleChange}
            placeholder="Enter miscellaneous expenses"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
          >
            Create
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

export default ExpenseForm;
