import axiosInstance from "@/lib/axios";

export const getUsers = async () => {
  const res = await axiosInstance.get("/users");

  return res.data.data;
};