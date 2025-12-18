import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({
                success: false,
                message: "Email dan OTP wajib diisi",
                code: 400
            }, { status: 400 });
        }

        // 1. Cari OTP
        const otpRecord = await prisma.tb_otp.findFirst({
            where: { email, otp },
        });

        if (!otpRecord) {
            return NextResponse.json({
                success: false,
                message: "Kode OTP salah.",
                code: 400
            }, { status: 400 });
        }

        // 2. Cek Expired
        if (new Date() > otpRecord.expiresAt) {
            return NextResponse.json({
                success: false,
                message: "Kode OTP sudah kadaluarsa.",
                code: 400
            }, { status: 400 });
        }

        // 3. Sukses (Jangan hapus OTP dulu!)
        return NextResponse.json({
            success: true,
            message: "OTP Valid. Silakan masukkan password baru.",
            code: 200
        }, { status: 200 });

    } catch (error) {
        console.error("VERIFY_CHECK_ERROR:", error);
        return NextResponse.json({
            success: false,
            message: "Terjadi kesalahan server",
            code: 500
        }, { status: 500 });
    }
}