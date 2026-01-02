export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    code?: number;
    data?: T;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    notelp: string;
}

export interface LogoutRequest {
    userId: number;
    email: string;
}

export interface ChangePasswordRequest {
    userId: number;
    currentPassword: string;
    newPassword: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

export interface ResetPasswordRequest {
    email: string;
    otp: string;
    newPassword: string;
}
export interface UserProfileState {
    id: number;
    username: string;
    email: string;
    notelp: string;
    role: string;
    avatar?: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
        user?: User;
        token?: string;
        [key: string]: unknown;
    };
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    notelp?: string;
    avatar?: string;
    createdAt?: string;
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
    ) {
        return String((error as { message: unknown }).message);
    }
    return "Terjadi kesalahan yang tidak diketahui";
}