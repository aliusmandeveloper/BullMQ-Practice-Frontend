"use client";

import { useTasks } from "@/features/task/hooks/useTasks";
import TaskCard from "@/features/task/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();
  const { data = [], isLoading } = useTasks();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Tasks
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and track all your tasks
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/tasks/create")}
          className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center gap-2"
        >
          <Plus size={18} />
          Create Task
        </Button>
      </div>

      {/* Tasks List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No tasks yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create your first task to get started
          </p>
          <Button
            onClick={() => router.push("/dashboard/tasks/create")}
            variant="outline"
            className="mt-4"
          >
            Create Task
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map((task: any) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}