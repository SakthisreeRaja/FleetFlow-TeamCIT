import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import TripTable from "../../components/dashboard/TripTable";
import TripForm from "../../components/dashboard/TripForm";

function Trips() {
  const [showForm, setShowForm] = useState(false);
  const [trips, setTrips] = useState([
    {
      type: "Trailer Truck",
      origin: "Mumbai",
      destination: "Pune",
      status: "On way",
    },
    {
      type: "Cargo Van",
      origin: "Delhi",
      destination: "Jaipur",
      status: "Completed",
    },
    {
      type: "Container Truck",
      origin: "Chennai",
      destination: "Bangalore",
      status: "Pending",
    },
  ]);

  const [vehicles] = useState([
    { id: 1, plate: "MH 00", model: "TATA" },
    { id: 2, plate: "DL 01", model: "Ashok Leyland" },
    { id: 3, plate: "KA 02", model: "Mahindra" },
  ]);

  const handleAddTrip = (formData) => {
    const newTrip = {
      type: formData.vehicle,
      origin: formData.originAddress,
      destination: formData.destination,
      status: "Pending",
    };
    setTrips([...trips, newTrip]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Trip Dispatcher & Management
          </h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          {showForm ? "Hide Form" : "New Trip"}
        </button>
      </div>

      {/* Info Section */}
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trip Table */}
        <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
          <TripTable trips={trips} />
        </div>

        {/* Trip Form */}
        {showForm && (
          <div className="lg:col-span-1">
            <TripForm
              onSubmit={handleAddTrip}
              onCancel={() => setShowForm(false)}
              vehicles={vehicles}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Trips;
