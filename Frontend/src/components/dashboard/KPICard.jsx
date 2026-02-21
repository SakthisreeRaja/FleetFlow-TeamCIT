function KPICard({ title, value, icon: Icon, color = "primary" }) {
  const colorClasses = {
    primary: "text-[#8B1E3F]",
    green: "text-green-500",
    yellow: "text-yellow-500",
    orange: "text-orange-500",
    blue: "text-blue-500",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {Icon && <Icon className={`w-6 h-6 ${colorClasses[color]}`} />}
      </div>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
    </div>
  );
}

export default KPICard;
