import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// --- KONFIGURASI CORS ---
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 1. HANDLE OPTIONS (Agar status 200 OK saat preflight check)
export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// 2. HANDLE POST (Logic Ganti Password)
export async function POST(req: Request) {
    try {
        const { userId, currentPassword, newPassword } = await req.json();

        // Validasi
        if (!userId || !currentPassword || !newPassword) {
            return NextResponse.json(
                { success: false, message: "Data tidak lengkap" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Cari User
        const user = await prisma.tb_user.findUnique({
            where: { id: Number(userId) },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User tidak ditemukan" },
                { status: 404, headers: corsHeaders }
            );
        }

        // Cek Password Lama
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: "Password saat ini salah" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Hash Password Baru
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update
        await prisma.tb_user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json(
            { success: true, message: "Password berhasil diubah" },
            { status: 200, headers: corsHeaders }
        );

    } catch (error) {
        console.error("Change Password Error:", error);
        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500, headers: corsHeaders }
        );
    }
}