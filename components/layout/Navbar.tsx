"use client";

import { Bell, LogOut, User } from "lucide-react";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const { data: notifications = [] } = useNotifications();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const unreadNotifications = notifications.filter(
    (notification: any) => !notification.read
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center justify-between px-4 md:px-6 shadow-sm">
      <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
        Task Management System
      </h1>

      <div className="flex items-center gap-3 md:gap-5">
        {/* User Name */}
        {user && (
          <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
            {user.name}
          </span>
        )}

        {/* Notification Bell */}
<div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className="relative p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
  >
    <Bell size={22} className="text-gray-600 dark:text-gray-400" />
    {unreadNotifications.length > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1.5 ring-2 ring-white dark:ring-gray-950">
        {unreadNotifications.length}
      </span>
    )}
  </button>

  {open && (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 font-semibold text-gray-800 dark:text-white">
        Notifications
      </div>
      
      {/* Scrollable container */}
      <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {unreadNotifications.length === 0 ? (
          <p className="p-4 text-gray-500 dark:text-gray-400 text-sm text-center">
            No new notifications
          </p>
        ) : (
          unreadNotifications.map((notification: any) => (
            <div
              key={notification._id}
              className="p-3 border-b border-gray-100 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              {notification.message}
            </div>
          ))
        )}
      </div>
    </div>
  )}
</div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 px-3 py-1.5"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline-block">Logout</span>
        </Button>
      </div>
    </nav>
  );
}