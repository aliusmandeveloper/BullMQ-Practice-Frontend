"use client";

import { Bell, LogOut } from "lucide-react";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    data: notifications = [],
  } = useNotifications();

  const unreadNotifications = notifications.filter(
    (notification: any) => !notification.read
  );
const handleLogout = () => {
  localStorage.removeItem("token");

  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

  router.push("/login");
  router.refresh();
};
  return (
    <nav className="h-16 border-b bg-white flex items-center justify-between px-6">

      <h1 className="text-xl font-bold">
        Task Management System
      </h1>

      <div className="flex items-center gap-5">

        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="relative"
          >
            <Bell size={25} />

            {
              unreadNotifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {unreadNotifications.length}
                </span>
              )
            }

          </button>


          {
            open && (
              <div className="absolute right-0 mt-3 w-80 bg-white border rounded-lg shadow-lg z-50">

                <div className="p-3 border-b font-semibold">
                  Notifications
                </div>


                {
                  unreadNotifications.length === 0 ? (

                    <p className="p-4 text-gray-500">
                      No new notifications
                    </p>

                  ) : (

                    unreadNotifications.map((notification: any) => (
                      <div
                        key={notification._id}
                        className="p-3 border-b text-sm"
                      >
                        {notification.message}
                      </div>
                    ))

                  )
                }

              </div>
            )
          }

        </div>


        <Button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white py-4"
        >
          <LogOut size={20} />
          Logout
        </Button>

      </div>

    </nav>
  );
}