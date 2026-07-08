"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getNotifications,
  markNotificationAsRead,
} from "../api/notification.api";

export const useNotifications = () => {
  return useQuery({
    queryKey:["notifications"],
    queryFn:getNotifications,
    refetchInterval:3000,
    staleTime:0,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:markNotificationAsRead,

    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["notifications"],
      });
    },
  });
};