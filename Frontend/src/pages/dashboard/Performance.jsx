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
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Driver Performance & Safety Profiles
        </h1>
        <p className="text-sm text-gray-500">
          Monitor driver performance and safety metrics
        </p>
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="text-sm text-gray-600 space-y-3">
          <p className="font-semibold text-gray-800">
            What it's for: This page is all about the people driving your vehicles. It helps you make sure they are legal to drive and doing a good job.
          </p>
          <div>
            <p className="font-medium text-gray-700 mb-2">How it Works:</p>
            <p>
              <span className="font-medium text-[#8B1E3F]">The "Paperwork" Check:</span> You store the driver's license number and when it expires.
            </p>
            <p className="mt-2">
              <span className="font-medium text-red-600">The "Safety Lock" Rule:</span> If a driver's license expires, the system automatically locks them. You won't be able to assign them to any new trips until they renew it.
            </p>
            <p className="mt-2">
              <span className="font-medium text-green-600">Performance Scores:</span> The system gives drivers a "Safety Score" based on things like finishing trips on time and whether they've been involved in any accidents or reported issues.
            </p>
            <p className="mt-2">
              <span className="font-medium text-blue-600">Duty Status:</span> A simple switch to show if a driver is currently "On Duty," "Taking a Break," or "Suspended."
            </p>
          </div>
        </div>
      </div>

      {/* Driver Table */}
      <DriverTable drivers={drivers} />
    </div>
  );
}

export default Performance;
