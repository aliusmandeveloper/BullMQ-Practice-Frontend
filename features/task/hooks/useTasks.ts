"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../api/task.api";

/* GET TASKS */
export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};

/* CREATE TASK */
export const useCreateTask = () => {
  return useMutation({
    mutationFn: createTask,
  });
};

/* UPDATE TASK */
export const useUpdateTask = () => {
  return useMutation({
    mutationFn: ({ id, data }: any) => updateTask(id, data),
  });
};

/* DELETE TASK */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },

    onError: (error) => {
      console.log("DELETE ERROR:", error);
    },
  });
};