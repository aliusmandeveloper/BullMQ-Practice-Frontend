"use client";

import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function DashboardPage() {
  // Sample data - will be replaced with real API data
  const stats = {
    totalTasks: 25,
    completed: 10,
    pending: 15,
    users: 5,
  };

  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: LayoutDashboard,
      color: "blue",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "green",
      change: "+8%",
      trend: "up",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "amber",
      change: "-3%",
      trend: "down",
    },
    {
      title: "Users",
      value: stats.users,
      icon: Users,
      color: "purple",
      change: "+2",
      trend: "up",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/20",
      icon: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-950/20",
      icon: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/20",
      icon: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/20",
      icon: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
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
          <span className="font-medium text-green-600 dark:text-green-400">+12%</span>
          <span>from last month</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const colors = colorClasses[card.color as keyof typeof colorClasses];
          const TrendIcon = card.trend === "up" ? ArrowUpRight : ArrowDownRight;
          const trendColor = card.trend === "up" ? "text-green-600" : "text-red-600";

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
                  <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trendColor}`}>
                    <TrendIcon className="h-3 w-3" />
                    <span>{card.change}</span>
                    <span className="text-gray-400 dark:text-gray-600">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${colors.bg}`}>
                  <Icon className={`h-5 w-5 ${colors.icon}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity / Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Recent Tasks
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Task {index + 1}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Assigned 2 hours ago
                    </p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "40%" }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">40%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Tasks Due</span>
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">8 tasks</span>
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active Users</span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">5 users</span>
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Overdue Tasks</span>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">3 tasks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}