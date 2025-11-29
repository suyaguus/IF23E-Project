import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
    try {
        const { username, email, password, role } = await req.json();

        // Validasi input
        if (!username || !email || !password) {
            return NextResponse.json({
                success: false,
                message: "Username, email, dan password harus diisi"
            }, {
                status: 400
            });
        }

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                success: false,
                message: "Format email tidak valid"
            }, {
                status: 400
            });
        }

        // Cek apakah email sudah terdaftar
        const existingUser = await prisma.tb_user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "Email sudah terdaftar"
            }, {
                status: 400
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat user baru
        const newUser = await prisma.tb_user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                role: role || "User" // default role
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Registrasi berhasil",
            data: newUser
        }, {
            status: 201
        });

    } catch (error) {
        console.error("Error register:", error);
        return NextResponse.json({
            success: false,
            message: "Terjadi kesalahan saat registrasi",
            error: error instanceof Error ? error.message : String(error)
        }, {
            status: 500
        });
    }
};