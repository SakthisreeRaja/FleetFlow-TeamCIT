import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { tripsService, vehiclesService, driversService } from "../../services";
import TripTable from "../../components/dashboard/TripTable";
import TripForm from "../../components/dashboard/TripForm";

function Trips() {
  const [showForm, setShowForm] = useState(false);
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTrip, setEditingTrip] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tripsData, vehiclesData, driversData] = await Promise.all([
        tripsService.getTrips(),
        vehiclesService.getVehicles(),
        driversService.getDrivers()
      ]);
      setTrips(tripsData);
      setVehicles(vehiclesData);
      setDrivers(driversData);
      setError("");
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrip = async (formData) => {
    try {
      console.log("Submitting trip data:", formData);
      if (editingTrip) {
        await tripsService.updateTrip(editingTrip.id, formData);
      } else {
        await tripsService.createTrip(formData);
      }
      await fetchData();
      setShowForm(false);
      setEditingTrip(null);
      setError("");
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || "Failed to save trip. Please try again.";
      setError(errorMessage);
      console.error("Error saving trip:", err);
      console.error("Error response:", err.response?.data);
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleCompleteTrip = async (tripId, endOdometer) => {
    try {
      await tripsService.completeTrip(tripId, endOdometer);
      await fetchData();
    } catch (err) {
      setError("Failed to complete trip. Please try again.");
      console.error("Error completing trip:", err);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        await tripsService.deleteTrip(tripId);
        await fetchData();
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to delete trip. Please try again.");
        console.error("Error deleting trip:", err);
      }
    }
  };

  const handleEditTrip = (trip) => {
    setEditingTrip(trip);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTrip(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1E3F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trips...</p>
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
            Trip Dispatcher & Management
          </h1>
        </div>
        <button
          onClick={() => {
            if (!showForm) {
              setEditingTrip(null);
            }
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          {showForm ? "Hide Form" : "New Trip"}
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trip Table */}
        <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
          <TripTable 
            trips={trips} 
            onCompleteTrip={handleCompleteTrip}
            onDeleteTrip={handleDeleteTrip}
            onEditTrip={handleEditTrip}
          />
        </div>

        {/* Trip Form */}
        {showForm && (
          <div className="lg:col-span-1">
            <TripForm
              key={editingTrip?.id || "new-trip"}
              onSubmit={handleAddTrip}
              onCancel={handleFormCancel}
              vehicles={vehicles}
              drivers={drivers}
              initialData={editingTrip}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Trips;
