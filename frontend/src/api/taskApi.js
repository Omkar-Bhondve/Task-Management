import API from "./axios";

// Get all tasks
export const getTasks = async () => {
  const response = await API.get("/tasks");
  return response.data;
};

// Get single task
export const getTaskById = async (id) => {
  const response = await API.get(`/tasks/${id}`);
  return response.data;
};

// Create task
export const createTask = async (taskData) => {
  const response = await API.post("/tasks", taskData);
  return response.data;
};

// Update task
export const updateTask = async (id, taskData) => {
  const response = await API.put(`/tasks/${id}`, taskData);
  return response.data;
};

// Delete task
export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};

// Toggle task completion
export const toggleTaskCompletion = async (id) => {
  const response = await API.patch(`/tasks/${id}/toggle`);
  return response.data;
};
