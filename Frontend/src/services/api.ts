import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;

// API Services
export const authService = {
  login: (email: string, password: string, role: string) =>
    api.post(`/auth/${role}/login`, { email, password }),
  signup: (data: any, role: string) => api.post(`/auth/${role}/signup`, data),
};

export const doctorService = {
  getAll: (params?: any) => api.get("/doctors", { params }),
  getById: (id: string) => api.get(`/doctors/${id}`),
  update: (id: string, data: any) => api.put(`/doctors/${id}`, data),
  approve: (id: string, isApproved: boolean) =>
    api.put(`/doctors/${id}/approve`, { isApproved }),
  getAvailability: (id: string) => api.get(`/doctors/${id}/availability`),
  setAvailability: (data: any) => api.post("/doctors/availability", data),
};

export const appointmentService = {
  create: (data: any) => api.post("/appointments", data),
  getAll: (params?: any) => api.get("/appointments", { params }),
  getById: (id: string) => api.get(`/appointments/${id}`),
  update: (id: string, data: any) => api.put(`/appointments/${id}`, data),
  cancel: (id: string) => api.delete(`/appointments/${id}`),
};

export const prescriptionService = {
  create: (data: any) => api.post("/prescriptions", data),
  getPatient: (patientId?: string) =>
    api.get(`/prescriptions/patient/${patientId || ""}`),
  getById: (id: string) => api.get(`/prescriptions/${id}`),
};

export const reviewService = {
  create: (data: any) => api.post("/reviews", data),
  getDoctor: (doctorId: string) => api.get(`/reviews/doctor/${doctorId}`),
  respond: (id: string, response: string) =>
    api.put(`/reviews/${id}/respond`, { doctorResponse: response }),
};

export const ehrService = {
  get: (patientId?: string) => api.get(`/ehr/${patientId || ""}`),
  update: (data: any) => api.put("/ehr", data),
  addDocument: (data: any) => api.post("/ehr/document", data),
};

export const chatService = {
  get: (appointmentId: string) => api.get(`/chat/${appointmentId}`),
  create: (data: any) => api.post("/chat", data),
  sendMessage: (appointmentId: string, message: string) =>
    api.post(`/chat/${appointmentId}/message`, { message }),
  markAsRead: (appointmentId: string) => api.put(`/chat/${appointmentId}/read`),
};

export const adminService = {
  getStats: () => api.get("/admin/stats"),
  getUsers: (role?: string) => api.get("/admin/users", { params: { role } }),
  getAnalytics: (params?: any) => api.get("/admin/analytics", { params }),
};
