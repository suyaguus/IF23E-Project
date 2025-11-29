import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// POST - Login User
export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();

        // Validasi input
        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: "Email dan password harus diisi"
            }, {
                status: 400
            });
        }

        // Cari user berdasarkan email
        const user = await prisma.tb_user.findUnique({
            where: { email: email },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                password: true,
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Email atau password salah"
            }, {
                status: 401
            });
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: "Email atau password salah"
            }, {
                status: 401
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Hapus password dari response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            success: true,
            message: "Login berhasil",
            data: {
                user: userWithoutPassword,
                token: token
            }
        }, {
            status: 200
        });

    } catch (error) {
        console.error("Error login:", error);
        return NextResponse.json({
            success: false,
            message: "Terjadi kesalahan saat login",
            error: error instanceof Error ? error.message : String(error)
        }, {
            status: 500
        });
    }
};