"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../api/dashboard.api";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
    staleTime: 60000, // 1 minute
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};