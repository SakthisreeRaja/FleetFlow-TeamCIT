import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { driversService } from "../../services";
import DriverTable from "../../components/dashboard/DriverTable";
import DriverForm from "../../components/dashboard/DriverForm";

function Performance() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const data = await driversService.getDrivers();
      setDrivers(data);
      setError("");
    } catch (err) {
      setError("Failed to load drivers. Please try again.");
      console.error("Error fetching drivers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDriver = async (formData) => {
    try {
      if (editingDriver) {
        await driversService.updateDriver(editingDriver.id, formData);
      } else {
        await driversService.createDriver(formData);
      }
      await fetchDrivers();
      setShowForm(false);
      setEditingDriver(null);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save driver. Please try again.");
      console.error("Error saving driver:", err);
    }
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setShowForm(true);
  };

  const handleDeleteDriver = async (driverId) => {
    if (window.confirm("Are you sure you want to delete this driver? This action cannot be undone.")) {
      try {
        await driversService.deleteDriver(driverId);
        await fetchDrivers();
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to delete driver. Please try again.");
        console.error("Error deleting driver:", err);
      }
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingDriver(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1E3F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading drivers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Driver Performance & Safety Profiles
          </h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          {showForm ? "Hide Form" : "Add Driver"}
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Driver Table */}
        <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
          <DriverTable 
            drivers={drivers}
            onEditDriver={handleEditDriver}
            onDeleteDriver={handleDeleteDriver}
          />
        </div>

        {/* Driver Form */}
        {showForm && (
          <div className="lg:col-span-1">
            <DriverForm
              key={editingDriver?.id || "new-driver"}
              onSubmit={handleAddDriver}
              onCancel={handleFormCancel}
              initialData={editingDriver}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Performance;
