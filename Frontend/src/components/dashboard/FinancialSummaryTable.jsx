function FinancialSummaryTable({ financialData, formatCurrency }) {
  if (!financialData || !financialData.metrics) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <p className="text-center text-gray-500">No financial data available</p>
      </div>
    );
  }

  const { metrics } = financialData;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Financial Summary</h3>
          <div className="text-sm text-gray-600">
            <span className="font-medium">{financialData.trip_count}</span> trips | 
            <span className="font-medium ml-2">{financialData.fuel_entries}</span> fuel entries | 
            <span className="font-medium ml-2">{financialData.maintenance_entries}</span> maintenance records
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Total Revenue
          </p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency ? formatCurrency(metrics.total_revenue) : `₹${metrics.total_revenue.toFixed(2)}`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            ₹{metrics.total_revenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Fuel Cost
          </p>
          <p className="text-2xl font-bold text-orange-600">
            {formatCurrency ? formatCurrency(metrics.fuel_cost) : `₹${metrics.fuel_cost.toFixed(2)}`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            ₹{metrics.fuel_cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Maintenance
          </p>
          <p className="text-2xl font-bold text-yellow-600">
            {formatCurrency ? formatCurrency(metrics.maintenance_cost) : `₹${metrics.maintenance_cost.toFixed(2)}`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            ₹{metrics.maintenance_cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Other Expenses
          </p>
          <p className="text-2xl font-bold text-red-600">
            {formatCurrency ? formatCurrency(metrics.other_expenses) : `₹${metrics.other_expenses.toFixed(2)}`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            ₹{metrics.other_expenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-6 bg-[#FDF2F5]">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Net Profit
          </p>
          <p className={`text-2xl font-bold ${metrics.net_profit >= 0 ? 'text-[#8B1E3F]' : 'text-red-600'}`}>
            {formatCurrency ? formatCurrency(metrics.net_profit) : `₹${metrics.net_profit.toFixed(2)}`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            ₹{metrics.net_profit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FinancialSummaryTable;
