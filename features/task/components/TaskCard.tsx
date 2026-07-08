"use client";

import { Button } from "@/components/ui/button";
import { useDeleteTask } from "../hooks/useTasks";

export default function TaskCard({ task }: any) {
  const deleteTask = useDeleteTask();

  const handleDelete = (id: string) => {
    console.log("DELETE ID:", id);

    deleteTask.mutate(id);
  };

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm flex justify-between items-start">

      <div>
        <h2 className="text-lg font-semibold">
          {task.title}
        </h2>

        <p className="text-gray-500 text-sm">
          {task.description}
        </p>

        <p className="text-xs mt-2">
          👤 Assigned To: {task.assignedTo?.name}
        </p>

        <p className="text-xs text-gray-400">
          📧 {task.assignedTo?.email}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">

        <span
          className={`px-2 py-1 text-xs rounded ${task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {task.status}
        </span>

        <Button
          onClick={() => handleDelete(task._id)}
        >
          Delete
        </Button>

      </div>

    </div>
  );
}