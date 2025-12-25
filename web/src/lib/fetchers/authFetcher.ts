import api from "@/lib/axios";
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  ApiResponse,
  UserProfileState
} from "@/types/auth";

export const authFetcher = {
  login: async (payload: LoginRequest): Promise<ApiResponse<UserProfileState>> => {
    const response = await api.post("/auth/login", payload);
    return response.data;
  },

  register: async (payload: RegisterRequest): Promise<ApiResponse<UserProfileState>> => {
    const response = await api.post("/auth/register", payload);
    return response.data;
  },

  forgotPassword: async (payload: ForgotPasswordRequest): Promise<ApiResponse> => {
    const response = await api.post("/auth/forgot-password", payload);
    return response.data;
  },

  resetPassword: async (payload: ResetPasswordRequest): Promise<ApiResponse> => {
    const response = await api.post("/auth/reset-password", payload);
    return response.data;
  },

  changePassword: async (payload: ChangePasswordRequest): Promise<ApiResponse> => {
    const response = await api.post("/auth/change-password", payload);
    return response.data;
  }
};