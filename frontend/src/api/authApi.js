import API from "./axios";

// Register user
export const register = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

// Login user
export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

// Get user profile
export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};

// Logout user (client-side only)
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
