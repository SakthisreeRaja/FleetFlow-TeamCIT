import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

function createInitialFormData(initialData = null) {
  return {
    full_name: initialData?.full_name || "",
    phone: initialData?.phone || "",
    license_number: initialData?.license_number || "",
    license_category: initialData?.license_category || "",
    license_expiry: initialData?.license_expiry ? initialData.license_expiry.split("T")[0] : "",
  };
}

function DriverForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState(() => createInitialFormData(initialData));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = {
      full_name: formData.full_name,
      phone: formData.phone,
      license_number: formData.license_number,
      license_category: formData.license_category,
      license_expiry: formData.license_expiry,
    };
    
    onSubmit(submitData);
    
    if (!initialData) {
      setFormData(createInitialFormData());
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <UserIcon className="w-5 h-5 text-[#8B1E3F]" />
        <h3 className="text-lg font-semibold text-gray-800">
          {initialData ? "Edit Driver" : "New Driver"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name:
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter driver's full name"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number:
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1234567890"
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License Number:
          </label>
          <input
            type="text"
            name="license_number"
            value={formData.license_number}
            onChange={handleChange}
            placeholder="DL-1234567890"
            required
            disabled={initialData !== null}
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {initialData && (
            <p className="text-xs text-gray-500 mt-1">License number cannot be changed</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License Category:
          </label>
          <select
            name="license_category"
            value={formData.license_category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          >
            <option value="">Select category</option>
            <option value="LMV">LMV (Light Motor Vehicle)</option>
            <option value="HMV">HMV (Heavy Motor Vehicle)</option>
            <option value="MCWG">MCWG (Motorcycle with Gear)</option>
            <option value="MCWOG">MCWOG (Motorcycle without Gear)</option>
            <option value="TRANS">TRANS (Transport Vehicle)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License Expiry Date:
          </label>
          <input
            type="date"
            name="license_expiry"
            value={formData.license_expiry}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-colors font-medium text-sm"
          >
            {initialData ? "Update Driver" : "Add Driver"}
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

export default DriverForm;
