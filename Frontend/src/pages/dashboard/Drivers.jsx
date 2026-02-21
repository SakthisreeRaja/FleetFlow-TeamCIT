import { useState, useEffect } from "react";
import { PlusIcon, TruckIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { driversService, vehiclesService } from "../../services";
import DriverForm from "../../components/dashboard/DriverForm";
import DriverTable from "../../components/dashboard/DriverTable";

function Drivers() {
  const [showForm, setShowForm] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assignedVehicle, setAssignedVehicle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [driversData, vehiclesData] = await Promise.all([
        driversService.getDrivers(),
        vehiclesService.getVehicles()
      ]);
      setDrivers(driversData);
      setVehicles(vehiclesData);
      setError("");
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Error fetching data:", err);
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
      await fetchData();
      setShowForm(false);
      setEditingDriver(null);
    } catch (err) {
      setError(
        editingDriver
          ? "Failed to update driver. Please try again."
          : "Failed to add driver. Please try again."
      );
      console.error("Error saving driver:", err);
    }
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setShowForm(true);
  };

  const handleDeleteDriver = async (driverId) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      try {
        await driversService.deleteDriver(driverId);
        await fetchData();
      } catch (err) {
        setError("Failed to delete driver. Driver may have active trips.");
        console.error("Error deleting driver:", err);
      }
    }
  };

  const handleAssignVehicle = (driver) => {
    setSelectedDriver(driver);
    setShowAssignModal(true);
  };

  const handleAssignSubmit = async () => {
    if (!assignedVehicle) {
      alert("Please select a vehicle");
      return;
    }

    try {
      // Update driver status to ON_DUTY if they're available
      if (selectedDriver.status === "OFF_DUTY") {
        await driversService.updateDriver(selectedDriver.id, {
          status: "ON_DUTY"
        });
      }
      
      // In a real scenario, you might create a trip here or just show success
      alert(`Vehicle ${assignedVehicle} assigned to ${selectedDriver.full_name}`);
      setShowAssignModal(false);
      setAssignedVehicle("");
      await fetchData();
    } catch (err) {
      setError("Failed to assign vehicle. Please try again.");
      console.error("Error assigning vehicle:", err);
    }
  };

  const getAvailableDriversCount = () => {
    return drivers.filter(d => d.status === "ON_DUTY" || d.status === "OFF_DUTY").length;
  };

  const getOnTripCount = () => {
    return drivers.filter(d => d.status === "ON_TRIP").length;
  };

  const getAvailableVehicles = () => {
    return vehicles.filter(v => v.status === "AVAILABLE");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Driver Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Add and manage drivers, check availability, and assign vehicles
          </p>
        </div>
        <button
          onClick={() => {
            setEditingDriver(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#6d1732] transition-colors shadow-sm"
        >
          <PlusIcon className="w-5 h-5" />
          Add Driver
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Drivers</p>
              <p className="text-3xl font-bold text-[#8B1E3F]">{drivers.length}</p>
            </div>
            <UserGroupIcon className="w-12 h-12 text-[#8B1E3F] opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Available Drivers</p>
              <p className="text-3xl font-bold text-green-600">{getAvailableDriversCount()}</p>
            </div>
            <UserGroupIcon className="w-12 h-12 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">On Trip</p>
              <p className="text-3xl font-bold text-blue-600">{getOnTripCount()}</p>
            </div>
            <TruckIcon className="w-12 h-12 text-blue-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Driver Form */}
      {showForm && (
        <DriverForm
          key={editingDriver?.id || "new-driver"}
          onSubmit={handleAddDriver}
          onCancel={() => {
            setShowForm(false);
            setEditingDriver(null);
          }}
          initialData={editingDriver}
        />
      )}

      {/* Driver Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1E3F]"></div>
        </div>
      ) : (
        <DriverTable
          drivers={drivers}
          onEditDriver={handleEditDriver}
          onDeleteDriver={handleDeleteDriver}
          onAssignVehicle={handleAssignVehicle}
        />
      )}

      {/* Vehicle Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <TruckIcon className="w-6 h-6 text-[#8B1E3F]" />
              <h3 className="text-lg font-semibold text-gray-800">
                Assign Vehicle to {selectedDriver?.full_name}
              </h3>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">
                Driver Status: 
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  selectedDriver?.status === "ON_DUTY" ? "bg-green-100 text-green-700" :
                  selectedDriver?.status === "OFF_DUTY" ? "bg-gray-100 text-gray-700" :
                  selectedDriver?.status === "ON_TRIP" ? "bg-blue-100 text-blue-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {selectedDriver?.status?.replace(/_/g, ' ')}
                </span>
              </p>

              {selectedDriver?.status === "ON_TRIP" && (
                <p className="text-sm text-orange-600 mt-2">
                  ⚠️ This driver is currently on a trip
                </p>
              )}

              {selectedDriver?.status === "SUSPENDED" && (
                <p className="text-sm text-red-600 mt-2">
                  ❌ This driver is suspended
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Available Vehicle:
              </label>
              <select
                value={assignedVehicle}
                onChange={(e) => setAssignedVehicle(e.target.value)}
                className="w-full px-4 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent"
                disabled={selectedDriver?.status === "ON_TRIP" || selectedDriver?.status === "SUSPENDED"}
              >
                <option value="">-- Select Vehicle --</option>
                {getAvailableVehicles().map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.license_plate}>
                    {vehicle.license_plate} - {vehicle.vehicle_type} ({vehicle.make} {vehicle.model})
                  </option>
                ))}
              </select>
              
              <p className="text-xs text-gray-500 mt-2">
                Available Vehicles: {getAvailableVehicles().length} of {vehicles.length}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setAssignedVehicle("");
                }}
                className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignSubmit}
                className="flex-1 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#6d1732] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedDriver?.status === "ON_TRIP" || selectedDriver?.status === "SUSPENDED"}
              >
                Assign Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Drivers;
