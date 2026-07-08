import axiosInstance from "@/lib/axios";

/* CREATE TASK */
export const createTask = async (data: any) => {
  const res = await axiosInstance.post("/tasks", data);
  return res.data;
};

/* GET ALL TASKS */
export const getTasks = async () => {
  const res = await axiosInstance.get("/tasks");
  return res.data.data; // ✅ ONLY ARRAY RETURN
};

/* UPDATE TASK */
export const updateTask = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/tasks/${id}`, data);
  return res.data;
};

/* DELETE TASK */
export const deleteTask = async (id: string) => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data;
};