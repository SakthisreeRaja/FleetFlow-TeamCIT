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
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Trip Dispatcher & Management
          </h1>
          <p className="text-sm text-gray-500">
            Schedule and track all fleet trips
          </p>
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
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="text-sm text-gray-600 space-y-3">
          <p className="font-semibold text-gray-800">
            What it's for: This is the "brain" of the operation. It's where you actually set up deliveries and move goods from one place to another.
          </p>
          <div>
            <p className="font-medium text-gray-700 mb-2">How it Works:</p>
            <p>
              <span className="font-medium text-[#8B1E3F]">Booking a Trip:</span> You pick a vehicle and a driver that are currently free and ready to go.
              You enter how much the cargo weighs. If you try to put a 2,000kg load into a 1,000kg van, the system will block you and say, "Too heavy!"
            </p>
            <p className="mt-2">
              The system then tracks the status of the job as it moves through four stages:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              <li>Pending - Just created</li>
              <li>On Way - Driver is en route</li>
              <li>Completed - Delivery successful</li>
              <li>Cancelled - Trip was cancelled</li>
            </ul>
          </div>
        </div>
      </div>

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
