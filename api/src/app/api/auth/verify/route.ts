import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export const POST = async (req: NextRequest) => {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Token tidak ditemukan"
            }, {
                status: 401
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as {
            userId: number;
            email: string;
            role: string;
        };

        // Cek apakah user masih ada di database
        const user = await prisma.tb_user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User tidak ditemukan"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Token valid",
            data: { user }
        }, {
            status: 200
        });

    } catch (error) {
        console.error("Error verify token:", error);
        return NextResponse.json({
            success: false,
            message: "Token tidak valid atau sudah kadaluarsa"
        }, {
            status: 401
        });
    }
};