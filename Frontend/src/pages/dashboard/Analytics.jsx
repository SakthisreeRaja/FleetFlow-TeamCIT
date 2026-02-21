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
        <h1 className="text-2xl font-semibold text-gray-800">
          Operational Analytics & Financial Reports
        </h1>
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
