import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        // validasi input
        if (!email || !otp) {
            return NextResponse.json({
                success: false,
                message: "Email dan OTP wajib diisi",
                code: 400
            }, {
                status: 400
            });
        }

        // validasi kode otp
        const otpRecord = await prisma.tb_otp.findFirst({
            where: { email, otp },
        });

        //  cek apakah otp valid
        if (!otpRecord) {
            return NextResponse.json({
                success: false,
                message: "Kode OTP salah.",
                code: 400
            }, {
                status: 400
            });
        }

        // cek apakah otp sudah kadaluarsa
        if (new Date() > otpRecord.expiresAt) {
            return NextResponse.json({
                success: false,
                message: "Kode OTP sudah kadaluarsa.",
                code: 400
            }, {
                status: 400
            });
        }

        // cek apakah otp sudah kadaluarsa
        if (new Date() > otpRecord.expiresAt) {
            return NextResponse.json({
                success: false,
                message: "Kode OTP sudah kadaluarsa.",
                code: 400
            }, {
                status: 400
            });
        }

        // jika otp valid, masukkan response sukses
        return NextResponse.json({
            success: true,
            message: "OTP Valid. Silakan masukkan password baru.",
            code: 200
        }, {
            status: 200
        });

    } catch (error) {
        console.error("VERIFY_CHECK_ERROR:", error);
        return NextResponse.json({
            success: false,
            message: "Terjadi kesalahan server",
            code: 500
        }, {
            status: 500
        });
    }
}