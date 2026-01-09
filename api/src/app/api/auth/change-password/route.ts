import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function POST(req: Request) {
    try {
        const { userId, currentPassword, newPassword } = await req.json();

        // 1. Validasi Input
        if (!userId || !currentPassword || !newPassword) {
            return NextResponse.json(
                { success: false, message: "Data tidak lengkap (ID User diperlukan)" },
                { status: 400, headers: corsHeaders }
            );
        }

        // 2. Cari user berdasarkan ID (Lebih akurat daripada email)
        const user = await prisma.tb_user.findUnique({
            where: { id: Number(userId) }, 
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User tidak ditemukan" },
                { status: 404, headers: corsHeaders }
            );
        }

        // 3. Cek password lama
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: "Password lama salah" },
                { status: 400, headers: corsHeaders }
            );
        }

        // 4. Hash password baru
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 5. Update password di database
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