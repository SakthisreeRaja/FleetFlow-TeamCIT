import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import ExpenseTable from "../../components/dashboard/ExpenseTable";
import ExpenseForm from "../../components/dashboard/ExpenseForm";

function Hiring() {
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState([
    {
      tripId: 321,
      driver: "John",
      distance: "1000 km",
      fuelExpense: "10k",
      miscExpense: "3k",
      status: "Done",
    },
    {
      tripId: 322,
      driver: "Sarah",
      distance: "800 km",
      fuelExpense: "8k",
      miscExpense: "2k",
      status: "Done",
    },
    {
      tripId: 323,
      driver: "Mike",
      distance: "1200 km",
      fuelExpense: "12k",
      miscExpense: "4k",
      status: "Pending",
    },
  ]);

  const handleAddExpense = (formData) => {
    const newExpense = {
      tripId: parseInt(formData.tripId),
      driver: formData.driver,
      distance: "TBD",
      fuelExpense: `${formData.fuelCost}`,
      miscExpense: `${formData.miscExpense}`,
      status: "Pending",
    };
    setExpenses([...expenses, newExpense]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Expense & Fuel Logging
          </h1>
          <p className="text-sm text-gray-500">
            Track fuel costs and trip expenses
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          {showForm ? "Hide Form" : "Add an Expense"}
        </button>
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="text-sm text-gray-600 space-y-3">
          <p className="font-semibold text-gray-800">
            What it's for: This is the digital "wallet" for your fleet. It tracks exactly how much money is being spent to keep your vehicles moving.
          </p>
          <div>
            <p className="font-medium text-gray-700 mb-2">How it Works:</p>
            <p>
              <span className="font-medium text-[#8B1E3F]">Fuel Tracking:</span> Every time a driver fills up the tank, you record how many liters they bought and how much it cost.
            </p>
            <p className="mt-2">
              <span className="font-medium text-green-600">Cost per Vehicle:</span> The system automatically connects these receipts to the specific vehicle used.
            </p>
            <p className="mt-2 text-gray-700">
              Over time, the system adds up these fuel costs and the repair bills to show you the "Total Cost" for each vehicle. This helps you see if a specific truck is becoming too expensive to keep.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Table */}
        <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
          <ExpenseTable expenses={expenses} />
        </div>

        {/* Expense Form */}
        {showForm && (
          <div className="lg:col-span-1">
            <ExpenseForm
              onSubmit={handleAddExpense}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Hiring;
