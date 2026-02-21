import { useState } from "react";
import AnalyticsKPICard from "../../components/dashboard/AnalyticsKPICard";
import FuelEfficiencyChart from "../../components/dashboard/FuelEfficiencyChart";
import CostliestVehiclesChart from "../../components/dashboard/CostliestVehiclesChart";
import FinancialSummaryTable from "../../components/dashboard/FinancialSummaryTable";

function Analytics() {
  const [financialData] = useState([
    {
      month: "Jan",
      revenue: "Rs. 17L",
      fuelCost: "Rs. 6L",
      netProfit: "Rs. 2L",
    },
    {
      month: "Feb",
      revenue: "Rs. 18L",
      fuelCost: "Rs. 7L",
      netProfit: "Rs. 3L",
    },
    {
      month: "Mar",
      revenue: "Rs. 19L",
      fuelCost: "Rs. 6.5L",
      netProfit: "Rs. 4L",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Operational Analytics & Financial Reports
        </h1>
        <p className="text-sm text-gray-500">
          Deep insights and business intelligence
        </p>
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="text-sm text-gray-600 space-y-3">
          <p className="font-semibold text-gray-800">
            What it's for: This is the "big picture." It turns all your data into easy-to-read charts and graphs so you can make smarter business decisions.
          </p>
          <div>
            <p className="font-medium text-gray-700 mb-2">What You'll See:</p>
            <p>
              <span className="font-medium text-[#8B1E3F]">Fuel Efficiency:</span> It tells you which trucks are "gas guzzlers" and which ones are saving you money by calculating how far they go on every liter of fuel.
            </p>
            <p className="mt-2">
              <span className="font-medium text-green-600">Vehicle Value (ROI):</span> It calculates if a vehicle is actually making you money. It compares the revenue the vehicle brings in against what you spend on its fuel and repairs.
            </p>
            <p className="mt-2">
              <span className="font-medium text-yellow-600">Duty Stock Alerts:</span> It highlights vehicles which are just sitting idle and not being used, so you can decide if you should sell them or assign them more work.
            </p>
            <p className="mt-2">
              <span className="font-medium text-blue-600">One-Click Reports:</span> You can quickly download a PDF or Excel sheet for monthly meetings, payroll, or tax season.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AnalyticsKPICard
          title="Total Fuel Cost"
          value="Rs. 2.6 L"
          trend="+ 12.5%"
          bgColor="bg-green-600"
        />
        <AnalyticsKPICard
          title="Fleet ROI"
          value="+ 12.5%"
          trend="Positive trend"
          bgColor="bg-[#8B1E3F]"
        />
        <AnalyticsKPICard
          title="Utilization Rate"
          value="82%"
          trend="Above target"
          bgColor="bg-blue-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FuelEfficiencyChart />
        <CostliestVehiclesChart />
      </div>

      {/* Financial Summary */}
      <FinancialSummaryTable financialData={financialData} />
    </div>
  );
}

export default Analytics;
