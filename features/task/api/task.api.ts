import axiosInstance from "@/lib/axios";

/* CREATE TASK */
export const createTask = async (data: any) => {
  const res = await axiosInstance.post("/tasks", data);
  return res.data;
};

/* GET ALL TASKS */
export const getTasks = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  // Build query string
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.status) queryParams.append("status", params.status);

  const queryString = queryParams.toString();
  const url = queryString ? `/tasks?${queryString}` : "/tasks";

  const res = await axiosInstance.get(url);
  
  // 🔥 Return full response with pagination metadata
  return {
    data: res.data.data,        // Array of tasks
    pagination: res.data.pagination,  // Pagination metadata
  };
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