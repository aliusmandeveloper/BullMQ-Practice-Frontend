"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUsers } from "@/features/users/hooks/useUsers";
import { useCreateTask } from "@/features/task/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, User, Calendar, Clock, FileText, Tag } from "lucide-react";

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
      setReminderRules(reminderRules.filter((item) => item !== value));
    } else {
      setReminderRules([...reminderRules, value]);
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
          console.error("Create task error:", error);
          alert(error?.response?.data?.message || "Failed to create task");
        },
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Create Task
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Fill in the details to create a new task
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Task Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <textarea
                placeholder="Enter task description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>

          {/* Reminder Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Reminder Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="datetime-local"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Reminder Rules */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Reminder Before (Minutes)
            </label>
            <div className="flex flex-wrap gap-3">
              {[60, 30, 20, 10, 5].map((time) => (
                <label
                  key={time}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                    reminderRules.includes(time)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={reminderRules.includes(time)}
                    onChange={() => handleReminderChange(time)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">{time} min</span>
                </label>
              ))}
            </div>
          </div>

          {/* Assign User */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Assign User <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
              >
                <option value="">Select a user</option>
                {usersLoading ? (
                  <option disabled>Loading users...</option>
                ) : (
                  users.map((user: any) => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))
                )}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Button
              onClick={handleSubmit}
              disabled={createTask.isPending}
              className="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 rounded-lg shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {createTask.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4" />
                  Create Task
                </>
              )}
            </Button>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}