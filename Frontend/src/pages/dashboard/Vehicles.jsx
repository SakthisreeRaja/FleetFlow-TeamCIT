import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import VehicleTable from "../../components/dashboard/VehicleTable";
import VehicleRegistrationForm from "../../components/dashboard/VehicleRegistrationForm";
import VehicleDetailModal from "../../components/dashboard/VehicleDetailModal";

function Vehicles() {
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plate: "MH 00",
      model: "TATA",
      type: "Truck",
      odometer: 45000,
      maxPayload: "5000 kg",
      status: "Ready",
    },
    {
      id: 2,
      plate: "DL 01",
      model: "Ashok Leyland",
      type: "Truck",
      odometer: 62000,
      maxPayload: "7000 kg",
      status: "On Trip",
    },
    {
      id: 3,
      plate: "KA 02",
      model: "Mahindra",
      type: "Van",
      odometer: 38000,
      maxPayload: "2000 kg",
      status: "Maintenance",
    },
  ]);

  const handleAddVehicle = (formData) => {
    const newVehicle = {
      id: vehicles.length + 1,
      plate: formData.licensePlate,
      model: formData.model,
      type: formData.type,
      odometer: parseInt(formData.initialOdometer),
      maxPayload: formData.maxPayload,
      status: "Ready",
    };
    setVehicles([...vehicles, newVehicle]);
    setShowForm(false);
  };

  const handleViewVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleDeleteVehicle = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles(vehicles.filter((v) => v.id !== id));
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingVehicle(null);
  };

  return (
    <div className="space-y-6">
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
