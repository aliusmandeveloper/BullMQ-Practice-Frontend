import axiosInstance from "@/lib/axios";

export const getNotifications = async () => {
  const res = await axiosInstance.get("/notifications");

  return res.data.data;
};

export const markNotificationAsRead = async (id:string) => {
  const res = await axiosInstance.patch(
    `/notifications/${id}`
  );

  return res.data;
};