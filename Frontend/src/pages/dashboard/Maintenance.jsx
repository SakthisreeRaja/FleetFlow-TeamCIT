import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import MaintenanceTable from "../../components/dashboard/MaintenanceTable";
import ServiceForm from "../../components/dashboard/ServiceForm";

function Maintenance() {
  const [showForm, setShowForm] = useState(false);
  const [maintenanceLogs, setMaintenanceLogs] = useState([
    {
      id: 321,
      vehicle: "TATA",
      issue: "Engine Issue",
      date: "20/02",
      cost: "10k",
      status: "New",
    },
    {
      id: 322,
      vehicle: "Ashok Leyland",
      issue: "Tire Replacement",
      date: "18/02",
      cost: "5k",
      status: "Done",
    },
    {
      id: 323,
      vehicle: "Mahindra",
      issue: "Oil Change",
      date: "15/02",
      cost: "2k",
      status: "Done",
    },
  ]);

  const handleAddService = (formData) => {
    const newLog = {
      id: maintenanceLogs.length + 321,
      vehicle: formData.vehicleName,
      issue: formData.issueDescription,
      date: new Date(formData.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      }),
      cost: "TBD",
      status: "New",
    };
    setMaintenanceLogs([...maintenanceLogs, newLog]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
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
          <MaintenanceTable maintenanceLogs={maintenanceLogs} />
        </div>

        {/* Service Form */}
        {showForm && (
          <div className="lg:col-span-1">
            <ServiceForm
              onSubmit={handleAddService}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Maintenance;
