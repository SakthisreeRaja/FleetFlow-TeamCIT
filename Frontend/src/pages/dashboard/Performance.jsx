import { useState } from "react";
import DriverTable from "../../components/dashboard/DriverTable";

function Performance() {
  const [drivers] = useState([
    {
      name: "John",
      license: "23223",
      expiry: "22/36",
      completionRate: "92%",
      safetyScore: "89%",
      complaints: "4",
    },
    {
      name: "Sarah",
      license: "23224",
      expiry: "22/36",
      completionRate: "95%",
      safetyScore: "92%",
      complaints: "2",
    },
    {
      name: "Mike",
      license: "23225",
      expiry: "22/36",
      completionRate: "88%",
      safetyScore: "85%",
      complaints: "6",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Driver Performance & Safety Profiles
        </h1>
      </div>

      {/* Driver Table */}
      <DriverTable drivers={drivers} />
    </div>
  );
}

export default Performance;
