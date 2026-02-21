import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { expensesService, tripsService, vehiclesService } from "../../services";
import ExpenseTable from "../../components/dashboard/ExpenseTable";
import ExpenseForm from "../../components/dashboard/ExpenseForm";

function Hiring() {
  const [expenses, setExpenses] = useState([]);
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expenseData, tripsData, vehiclesData] = await Promise.all([
        expensesService.getExpenses(),
        tripsService.getTrips(),
        vehiclesService.getVehicles()
      ]);
      setExpenses(expenseData);
      setTrips(tripsData);
      setVehicles(vehiclesData);
      setError("");
    } catch (err) {
      setError("Failed to load expenses. Please try again.");
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (formData) => {
    try {
      if (editingExpense) {
        await expensesService.updateExpense(editingExpense.id, formData);
      } else {
        await expensesService.createExpense(formData);
      }
      await fetchData();
      setShowForm(false);
      setEditingExpense(null);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save expense. Please try again.");
      console.error("Error saving expense:", err);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDeleteExpense = async (expenseId) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await expensesService.deleteExpense(expenseId);
        await fetchData();
      } catch (err) {
        setError("Failed to delete expense. Please try again.");
        console.error("Error deleting expense:", err);
      }
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1E3F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading expenses...</p>
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
            Expense & Fuel Logging
          </h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1E3F] text-white rounded-lg hover:bg-[#751932] transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          {showForm ? "Hide Form" : "Add Expense"}
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Table */}
        <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
          <ExpenseTable 
            expenses={expenses}
            trips={trips}
            vehicles={vehicles}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>

        {/* Expense Form */}
        {showForm && (
          <div className="lg:col-span-1">
            <ExpenseForm
              key={editingExpense?.id || "new-expense"}
              onSubmit={handleAddExpense}
              onCancel={handleFormCancel}
              trips={trips}
              vehicles={vehicles}
              initialData={editingExpense}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Hiring;
