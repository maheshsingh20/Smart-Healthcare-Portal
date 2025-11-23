export interface JWTPayload {
  id: string;
  role: "admin" | "doctor" | "patient";
  iat?: number;
  exp?: number;
}

export interface AuthRequest {
  user?: JWTPayload;
}

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface FilterParams {
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}
