function FinancialSummaryTable({ financialData }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Financial Summary</h3>
          <button className="px-4 py-2 bg-[#8B1E3F] text-white rounded-lg text-sm hover:bg-[#751932] transition-colors">
            Download PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F4F6F9]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Fuel Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Net Profit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {financialData.map((data, index) => (
              <tr key={index} className="hover:bg-[#FDF2F5] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                  {data.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                  {data.revenue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                  {data.fuelCost}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#8B1E3F] font-bold">
                  {data.netProfit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinancialSummaryTable;
