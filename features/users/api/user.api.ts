import axiosInstance from "@/lib/axios";

export const getUsers = async () => {
  const res = await axiosInstance.get("/users");

  return res.data.data;
};
export const createUser = async (data: any) => {
  const res = await axiosInstance.post(
    "/users",
    data
  );

  return res.data;
};