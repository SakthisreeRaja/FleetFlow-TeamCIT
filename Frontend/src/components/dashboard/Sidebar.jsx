import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const ALL_MENU_ITEMS = [
  { name: "Dashboard", icon: HomeIcon, path: "/dashboard", roles: ["Manager"] },
  { name: "Vehicle Registry", icon: TruckIcon, path: "/dashboard/vehicles", roles: ["Manager", "Dispatcher"] },
  { name: "Driver Management", icon: UserGroupIcon, path: "/dashboard/drivers", roles: ["Manager", "Dispatcher"] },
  { name: "Trip Dispatcher", icon: ClipboardDocumentListIcon, path: "/dashboard/trips", roles: ["Manager", "Dispatcher"] },
  { name: "Maintenance", icon: WrenchScrewdriverIcon, path: "/dashboard/maintenance", roles: ["Manager"] },
  { name: "Trip Response", icon: CurrencyDollarIcon, path: "/dashboard/hiring", roles: ["Manager"] },
  { name: "Performance", icon: ChartBarIcon, path: "/dashboard/performance", roles: ["Manager", "Safety Officer"] },
  { name: "Analytics", icon: PresentationChartLineIcon, path: "/dashboard/analytics", roles: ["Manager", "Financial Analyst"] },
];

function Sidebar({ isOpen }) {
  const location = useLocation();
  const { user } = useAuth();
  
  // Get user role from auth context
  const userRole = user?.role || "Manager";

  // Filter menu items based on user role
  const menuItems = useMemo(() => {
    return ALL_MENU_ITEMS.filter((item) => item.roles.includes(userRole));
  }, [userRole]);

  return (
    <aside
      className={`bg-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col border-r border-gray-200 shadow-sm`}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <div className={`flex items-center gap-3 ${isOpen ? "justify-start" : "justify-center"}`}>
          <img 
            src="/logo.png" 
            alt="FleetFlow Logo" 
            className="w-10 h-10 object-contain"
          />
          {isOpen && (
            <h2 className="text-xl font-bold text-[#8B1E3F]">FleetFlow</h2>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-[#8B1E3F] text-white shadow-sm"
                        : "text-gray-600 hover:bg-[#FDF2F5] hover:text-[#8B1E3F]"
                    }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {isOpen && (
                    <span className="font-medium truncate text-sm">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {isOpen && (
          <div className="text-xs text-gray-500 text-center">
            FleetFlow © 2026
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
