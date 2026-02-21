import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { vehiclesService } from "../../services";
import VehicleTable from "../../components/dashboard/VehicleTable";
import VehicleRegistrationForm from "../../components/dashboard/VehicleRegistrationForm";
import VehicleDetailModal from "../../components/dashboard/VehicleDetailModal";

function Vehicles() {
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch vehicles from backend
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehiclesService.getVehicles();
      setVehicles(data);
      setError("");
    } catch (err) {
      setError("Failed to load vehicles. Please try again.");
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async (formData) => {
    try {
      await vehiclesService.createVehicle(formData);
      await fetchVehicles();
      setShowForm(false);
      setEditingVehicle(null);
    } catch (err) {
      setError("Failed to add vehicle. Please try again.");
      console.error("Error adding vehicle:", err);
    }
  };

  const handleViewVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleDeleteVehicle = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await vehiclesService.deleteVehicle(id);
        await fetchVehicles();
      } catch (err) {
        setError("Failed to delete vehicle. Please try again.");
        console.error("Error deleting vehicle:", err);
      }
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingVehicle(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1E3F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vehicles...</p>
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
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Vehicle Registry (Asset Management)
          </h1>
          <p className="text-sm text-gray-500">
            Manage your entire fleet of vehicles
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          {showForm ? "Hide Form" : "New Vehicle"}
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Table */}
        <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
          <VehicleTable
            vehicles={vehicles}
            onViewVehicle={handleViewVehicle}
            onEditVehicle={handleEditVehicle}
            onDeleteVehicle={handleDeleteVehicle}
          />
        </div>

        {/* Registration Form */}
        {showForm && (
          <div className="lg:col-span-1">
            <VehicleRegistrationForm
              onSubmit={handleAddVehicle}
              onCancel={handleFormCancel}
              initialData={editingVehicle}
            />
          </div>
        )}
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  );
}

export default Vehicles;
