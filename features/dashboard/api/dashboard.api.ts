import axiosInstance from "@/lib/axios";

export const getDashboardStats = async () => {
  const res = await axiosInstance.get("/analytics/stats");
  return res.data.data;
};