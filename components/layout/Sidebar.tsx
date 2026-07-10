"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, Users, Bell } from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    path: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications",
    icon: Bell,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 dark:bg-gray-950 text-white p-5 sticky top-0">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <span className="text-blue-400">Task</span>
        <span>Manager</span>
      </h1>

      <nav className="space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={20} className={isActive ? "text-white" : "text-gray-400"} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}