"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useCreateTask } from "@/features/task/hooks/useTasks";

export default function CreateTaskPage() {
  const router = useRouter();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const createTask = useCreateTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminderRules, setReminderRules] = useState<number[]>([30, 20, 10]);

  const handleReminderChange = (value: number) => {
    if (reminderRules.includes(value)) {
      setReminderRules(
        reminderRules.filter((item) => item !== value)
      );
    } else {
      setReminderRules([
        ...reminderRules,
        value,
      ]);
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !assignedTo || !reminderTime) {
      alert("Please fill all fields");
      return;
    }

    createTask.mutate(
      {
        title,
        description,
        assignedTo,
        reminderTime,
        reminderRules,
      },
      {
        onSuccess: () => {
          alert("✅ Task Created Successfully");

          setTitle("");
          setDescription("");
          setAssignedTo("");
          setReminderTime("");
          setReminderRules([30, 20, 10]);

          router.push("/dashboard/tasks");
        },
        onError: (error: any) => {
          console.log(error);

          alert(
            error?.response?.data?.message || "Failed to create task"
          );
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 border rounded-xl shadow-lg p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6">
        Create Task
      </h1>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Task Title
        </label>

        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          placeholder="Task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded w-full p-2 h-32"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Reminder Time
        </label>

        <input
          type="datetime-local"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Reminder Before (Minutes)
        </label>

        <div className="flex gap-3">

          {[60, 30, 20, 10, 5].map((time) => (
            <label
              key={time}
              className="flex items-center gap-1"
            >
              <input
                type="checkbox"
                checked={reminderRules.includes(time)}
                onChange={() => handleReminderChange(time)}
              />

              {time} min
            </label>
          ))}

        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Assign User
        </label>

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border rounded w-full p-2"
        >
          <option value="">
            Select User
          </option>

          {usersLoading ? (
            <option>
              Loading...
            </option>
          ) : (
            users.map((user: any) => (
              <option
                key={user._id}
                value={user._id}
              >
                {user.name} ({user.email})
              </option>
            ))
          )}

        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={createTask.isPending}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {createTask.isPending
          ? "Creating..."
          : "Create Task"}
      </button>

    </div>
  );
}