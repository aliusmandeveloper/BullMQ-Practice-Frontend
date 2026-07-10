"use client";

import { useState } from "react";
import { useTasks } from "@/features/task/hooks/useTasks";
import TaskCard from "@/features/task/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();
  
  // 🔥 Pagination State
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // Per page 6 tasks
  
  // 🔥 Fetch tasks with pagination
  const { data, isLoading } = useTasks({ page, limit });
  
  // Extract data and pagination
  const tasks = data?.data || [];
  const pagination = data?.pagination;

  // 🔥 Pagination Handlers
  const goToNextPage = () => {
    if (pagination?.hasNextPage) {
      setPage(page + 1);
    }
  };

  const goToPrevPage = () => {
    if (pagination?.hasPrevPage) {
      setPage(page - 1);
    }
  };

  const goToPage = (pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
      ) : tasks.length === 0 ? (
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
        <>
          {/* Tasks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tasks.map((task: any) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>

          {/* 🔥 Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              {/* Left side - Showing info */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {(pagination.page - 1) * pagination.limit + 1} -{" "}
                {Math.min(pagination.page * pagination.limit, pagination.totalCount)}{" "}
                of {pagination.totalCount} tasks
              </div>

              {/* Right side - Pagination buttons */}
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevPage}
                  disabled={!pagination.hasPrevPage}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft size={16} />
                  Previous
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                    (pageNum) => {
                      // Show only: current page, first, last, and neighbors
                      const isCurrentPage = pageNum === pagination.page;
                      const isFirst = pageNum === 1;
                      const isLast = pageNum === pagination.totalPages;
                      const isNeighbor = Math.abs(pageNum - pagination.page) <= 1;
                      
                      if (isFirst || isLast || isNeighbor) {
                        return (
                          <Button
                            key={pageNum}
                            variant={isCurrentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(pageNum)}
                            className={`w-9 h-9 ${
                              isCurrentPage
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : ""
                            }`}
                          >
                            {pageNum}
                          </Button>
                        );
                      }
                      
                      // Show dots for gaps
                      if (pageNum === 2 && pagination.page > 3) {
                        return <span key="dots1" className="px-1">...</span>;
                      }
                      if (pageNum === pagination.totalPages - 1 && pagination.page < pagination.totalPages - 2) {
                        return <span key="dots2" className="px-1">...</span>;
                      }
                      
                      return null;
                    }
                  )}
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={!pagination.hasNextPage}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}