"use client";

import { useNotifications, useMarkAsRead, useMarkAllAsRead } from "@/features/notifications/hooks/useNotifications";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  CheckCheck, 
  Mail, 
  MailCheck, 
  Loader2, 
  BellRing,
  ClipboardList,
  Megaphone
} from "lucide-react";

export default function NotificationsPage() {
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="mt-3 text-gray-500 dark:text-gray-400">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="h-7 w-7 text-blue-600" />
            Notifications
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {unreadCount === 0 
              ? "All caught up! No unread notifications" 
              : `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            onClick={() => markAllAsRead.mutate()}
            disabled={markAllAsRead.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            {markAllAsRead.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCheck size={16} />
            )}
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{notifications.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Unread</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{unreadCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Read</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {notifications.filter((n: any) => n.isRead).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Task Related</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {notifications.filter((n: any) => n.type === "TASK").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm overflow-hidden">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-700" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
              No notifications yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              You'll see notifications here when you get assigned tasks
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    Message
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Type
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification: any) => (
                <TableRow
                  key={notification._id}
                  className={`transition-colors ${
                    !notification.isRead 
                      ? "bg-blue-50/50 dark:bg-blue-950/10 hover:bg-blue-50 dark:hover:bg-blue-950/20" 
                      : "hover:bg-gray-50 dark:hover:bg-gray-900/50"
                  }`}
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    <div className="flex items-start gap-2">
                      {!notification.isRead && (
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                      )}
                      <span className={!notification.isRead ? "font-semibold" : ""}>
                        {notification.message}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        notification.type === "TASK"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {notification.type === "TASK" ? (
                        <ClipboardList className="h-3.5 w-3.5" />
                      ) : (
                        <Megaphone className="h-3.5 w-3.5" />
                      )}
                      {notification.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        notification.isRead
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      {notification.isRead ? (
                        <>
                          <MailCheck className="h-3 w-3" />
                          Read
                        </>
                      ) : (
                        <>
                          <BellRing className="h-3 w-3" />
                          Unread
                        </>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {!notification.isRead && (
                      <Button
                        size="sm"
                        onClick={() => markAsRead.mutate(notification._id)}
                        disabled={markAsRead.isPending}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 h-auto text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ml-auto"
                      >
                        {markAsRead.isPending ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <CheckCheck className="h-3 w-3" />
                        )}
                        Mark Read
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}