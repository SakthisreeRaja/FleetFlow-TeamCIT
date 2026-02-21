import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { maintenanceService, vehiclesService } from "../../services";
import MaintenanceTable from "../../components/dashboard/MaintenanceTable";
import ServiceForm from "../../components/dashboard/ServiceForm";

function Maintenance() {
  const [showForm, setShowForm] = useState(false);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingLog, setEditingLog] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [logs, vehiclesData] = await Promise.all([
        maintenanceService.getMaintenance(),
        vehiclesService.getVehicles()
      ]);
      setMaintenanceLogs(logs);
      setVehicles(vehiclesData);
      setError("");
    } catch (err) {
      setError("Failed to load maintenance data. Please try again.");
      console.error("Error fetching maintenance data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (formData) => {
    try {
      if (editingLog) {
        await maintenanceService.updateMaintenance(editingLog.id, formData);
      } else {
        await maintenanceService.createMaintenance(formData);
      }
      await fetchData();
      setShowForm(false);
      setEditingLog(null);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save maintenance record. Please try again.");
      console.error("Error saving maintenance:", err);
    }
  };

  const handleEditLog = (log) => {
    setEditingLog(log);
    setShowForm(true);
  };

  const handleDeleteLog = async (logId) => {
    if (window.confirm("Are you sure you want to delete this maintenance record?")) {
      try {
        await maintenanceService.deleteMaintenance(logId);
        await fetchData();
      } catch (err) {
        setError("Failed to delete maintenance record. Please try again.");
        console.error("Error deleting maintenance:", err);
      }
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingLog(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1E3F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading maintenance logs...</p>
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
            Maintenance / Service Logs
          </h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          {showForm ? "Hide Form" : "New Service"}
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Maintenance Table */}
        <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
          <MaintenanceTable 
            maintenanceLogs={maintenanceLogs}
            vehicles={vehicles}
            onEditLog={handleEditLog}
            onDeleteLog={handleDeleteLog}
          />
        </div>

        {/* Service Form */}
        {showForm && (
          <div className="lg:col-span-1">
            <ServiceForm
              key={editingLog?.id || "new-service"}
              onSubmit={handleAddService}
              onCancel={handleFormCancel}
              vehicles={vehicles}
              initialData={editingLog}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Maintenance;
