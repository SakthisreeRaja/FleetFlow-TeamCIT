function AnalyticsKPICard({ title, value, trend, bgColor = "bg-[#8B1E3F]" }) {
  return (
    <div className={`${bgColor} rounded-xl p-6 text-white shadow-sm`}>
      <h3 className="text-sm font-medium mb-2 opacity-90">{title}</h3>
      <p className="text-3xl font-bold mb-1">{value}</p>
      {trend && (
        <p className="text-sm opacity-80">
          {trend}
        </p>
      )}
    </div>
  );
}

export default AnalyticsKPICard;
