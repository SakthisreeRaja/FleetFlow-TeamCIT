import { useState, useEffect } from "react";
import { analyticsService, reportsService } from "../../services";
import AnalyticsKPICard from "../../components/dashboard/AnalyticsKPICard";
import FuelEfficiencyChart from "../../components/dashboard/FuelEfficiencyChart";
import CostliestVehiclesChart from "../../components/dashboard/CostliestVehiclesChart";
import FinancialSummaryTable from "../../components/dashboard/FinancialSummaryTable";

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [fleetPerformance, setFleetPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const [analytics, monthly, fleet] = await Promise.all([
        analyticsService.getAnalytics(),
        reportsService.getMonthlyReport(),
        reportsService.getFleetPerformance()
      ]);
      setAnalyticsData(analytics);
      setMonthlyReport(monthly);
      setFleetPerformance(fleet);
      setError("");
    } catch (err) {
      setError("Failed to load analytics data. Please try again.");
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(2)}K`;
    }
    return `₹${value.toFixed(2)}`;
  };

  const calculateROI = () => {
    if (!analyticsData) return "0%";
    const { total_revenue, total_fuel_cost, total_maintenance_cost } = analyticsData;
    const totalCost = total_fuel_cost + total_maintenance_cost;
    if (totalCost === 0) return "N/A";
    const roi = ((total_revenue - totalCost) / totalCost) * 100;
    return `${roi > 0 ? '+' : ''}${roi.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1E3F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
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
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Operational Analytics & Financial Reports
        </h1>
      </div>

      {/* KPI Cards */}
      {analyticsData && fleetPerformance && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AnalyticsKPICard
            title="Total Fuel Cost"
            value={formatCurrency(analyticsData.total_fuel_cost)}
            trend={`₹${analyticsData.total_fuel_cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
            bgColor="bg-green-600"
          />
          <AnalyticsKPICard
            title="Fleet ROI"
            value={calculateROI()}
            trend={`Net Profit: ${formatCurrency(analyticsData.fleet_net_profit)}`}
            bgColor="bg-[#8B1E3F]"
          />
          <AnalyticsKPICard
            title="Utilization Rate"
            value={`${fleetPerformance.utilization_rate}%`}
            trend={`${fleetPerformance.active_vehicles}/${fleetPerformance.fleet_size} active`}
            bgColor="bg-blue-600"
          />
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FuelEfficiencyChart />
        <CostliestVehiclesChart />
      </div>

      {/* Financial Summary */}
      {monthlyReport && (
        <FinancialSummaryTable 
          financialData={monthlyReport}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
}

export default Analytics;
