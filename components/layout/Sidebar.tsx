"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "📊",
  },
  {
    name: "Tasks",
    path: "/dashboard/tasks",
    icon: "✅",
  },
  {
    name: "Users",
    path: "/dashboard/users",
    icon: "👥",
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications",
    icon: "🔔",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        Task Manager 🚀
      </h1>

      <nav className="space-y-1">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}