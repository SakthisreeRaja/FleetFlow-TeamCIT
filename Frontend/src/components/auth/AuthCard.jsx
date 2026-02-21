function AuthCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default AuthCard;