"use client";

import { useTasks } from "@/features/task/hooks/useTasks";
import TaskCard from "@/features/task/components/TaskCard";
import { Button } from "@/components/ui/button";

export default function TasksPage() {
  const { data = [] } = useTasks();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <Button
          onClick={() => {
            // Navigate to the create task page
            window.location.href = "/dashboard/tasks/create";
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Create Task
        </Button>
      </div>

      <div className="space-y-3">
        {data.map((task: any) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}