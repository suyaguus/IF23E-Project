// Tipe untuk Response API standar (Backend ke Frontend)
export interface ApiResponse {
    success: boolean;
    message: string;
    code: number;
}

// Tipe untuk Request Body: Lupa Password (Step 1)
export interface ForgotPasswordRequest {
    email: string;
}

// Tipe untuk Request Body: Verifikasi OTP (Step 2)
export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

// Tipe untuk Request Body: Reset Password (Step 3)
export interface ResetPasswordRequest {
    email: string;
    otp: string;
    newPassword: string;
}

// Helper function untuk mengekstrak pesan error dari tipe 'unknown'
export function getErrorMessage(error: unknown): string {
    // 1. Jika error adalah Instance Error standar JS (ini yang terjadi saat 'throw new Error')
    if (error instanceof Error) {
        return error.message;
    }

    // 2. Jika error berupa string langsung
    if (typeof error === "string") {
        return error;
    }

    // 3. Jika error berupa object yang punya properti 'message' (mirip Interface ApiErrorResponse)
    if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
    ) {
        // Kita paksa (cast) sebagai object yang punya message string
        return String((error as { message: unknown }).message);
    }

    return "Terjadi kesalahan yang tidak diketahui";
}

// Tipe untuk State User di Form
export interface UserProfileState {
    id: number;
    username: string;
    email: string;
    notelp: string;
    avatar: string;
}