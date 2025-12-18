import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, otp, newPassword } = await req.json();

        // Validasi
        if (!email || !otp || !newPassword) {
            return NextResponse.json({
                success: false,
                message: "Data tidak lengkap",
                code: 400
            }, { status: 400 });
        }

        // 1. Verifikasi Ulang OTP (Security Check)
        // Kita harus pastikan OTP-nya masih ada dan valid sebelum ganti password
        const otpRecord = await prisma.tb_otp.findFirst({
            where: { email, otp },
        });

        if (!otpRecord || new Date() > otpRecord.expiresAt) {
            return NextResponse.json({
                success: false,
                message: "Sesi OTP tidak valid atau kadaluarsa. Ulangi proses lupa password.",
                code: 400
            }, { status: 400 });
        }

        // 2. Hash Password Baru
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 3. Update Password User
        await prisma.tb_user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        // 4. HAPUS OTP (Final Step)
        // Sekarang OTP baru dihapus karena password sudah berhasil diganti
        await prisma.tb_otp.delete({
            where: { id: otpRecord.id },
        });

        return NextResponse.json({
            success: true,
            message: "Password berhasil diubah. Silakan login.",
            code: 200
        }, { status: 200 });

    } catch (error) {
        console.error("RESET_EXECUTE_ERROR:", error);
        return NextResponse.json({
            success: false,
            message: "Gagal mengganti password",
            code: 500
        }, { status: 500 });
    }
}