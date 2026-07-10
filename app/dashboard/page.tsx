"use client";

import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from "lucide-react";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useDashboardStats();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="mt-3 text-gray-500 dark:text-gray-400">Loading dashboard data...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
          Failed to load dashboard
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {error?.message || "Please try again later"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Stats from API
  const stats = {
    totalTasks: data?.totalTasks || 0,
    completed: data?.completedTasks || 0,
    pending: data?.pendingTasks || 0,
    users: data?.totalUsers || 0,
  };

  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: LayoutDashboard,
      color: "blue",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "green",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "amber",
    },
    {
      title: "Users",
      value: stats.users,
      icon: Users,
      color: "purple",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/20",
      icon: "text-blue-600 dark:text-blue-400",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-950/20",
      icon: "text-green-600 dark:text-green-400",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/20",
      icon: "text-amber-600 dark:text-amber-400",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/20",
      icon: "text-purple-600 dark:text-purple-400",
    },
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <LayoutDashboard className="h-7 w-7 text-blue-600" />
            Welcome To Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening with your tasks today
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="font-medium text-green-600 dark:text-green-400">
            {stats.totalTasks > 0 ? `${Math.round((stats.completed / stats.totalTasks) * 100)}%` : "0%"}
          </span>
          <span>completion rate</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const colors = colorClasses[card.color as keyof typeof colorClasses];

          return (
            <div
              key={index}
              className={`bg-white dark:bg-gray-950 p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${colors.bg}`}>
                  <Icon className={`h-5 w-5 ${colors.icon}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tasks */}
      <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Recent Tasks
        </h3>
        {data?.recentTasks?.length > 0 ? (
          <div className="space-y-3">
            {data.recentTasks.map((task: any) => (
              <div
                key={task._id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${
                    task.status === "completed" 
                      ? "bg-green-500" 
                      : task.status === "in-progress" 
                      ? "bg-amber-500" 
                      : "bg-blue-500"
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Assigned to: {task.assignedTo?.name || "Unknown"}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : task.status === "in-progress"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                }`}>
                  {task.status || "pending"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No recent tasks found
          </p>
        )}
      </div>
    </div>
  );
}