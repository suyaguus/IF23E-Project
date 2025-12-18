import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";  // Sesuaikan dengan path Prisma Anda

// --- CONFIG CORS ---
const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const userId = Number(id);

    if (isNaN(userId)) {
        return NextResponse.json(
            {
                success: false, message: "ID tidak Valid"
            },
            {
                status: 400
            }

        );
    }

    const user = await prisma.tb_user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        return NextResponse.json(
            {
                success: false, message: "User Tidak Ditemukan"
            },
            {
                status: 404
            }
        );
    }

    await prisma.tb_order.deleteMany({
        where: { userId: userId },
    });

    await prisma.tb_user.delete({
        where: { id: userId },
    });

    return NextResponse.json(
        {
            success: true,
            message: "Data User Berhasil Di Hapus",
        },
        {
            status: 200
        }
    );

    // testing
};


// get user berdasarkan id
export const GET = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    try {
        const { id } = await context.params;
        const userId = Number(id);

        if (isNaN(userId)) {
            return NextResponse.json(
                {
                    success: false, message: "ID tidak Valid"
                },
                {
                    status: 400
                }
            );
        }

        const user = await prisma.tb_user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                email: true,
                password: true,
                role: true,
                notelp: true
            }
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false, message: "User Tidak DItemukan"
                },
                {
                    status: 404
                }
            );
        }

        return NextResponse.json(
            {
                success: true, message: "Data Berhasil Ditemukan", user
            },
            {
                status: 200
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                success: false, message: "SERVER ERROR", error: String(error)
            },
            {
                status: 500
            }
        );
    }
}

// buat putt data
export const PUT = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> } // Fix type params Next.js 15
) => {
    try {
        const { id } = await context.params;
        const userId = Number(id);
        const body = await req.json();

        if (isNaN(userId)) {
            return NextResponse.json(
                { success: false, message: "ID Tidak Valid" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Cek apakah user ada
        const existingUser = await prisma.tb_user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return NextResponse.json(
                { success: false, message: "User Tidak Ditemukan" },
                { status: 404, headers: corsHeaders }
            );
        }

        // 2. UPDATE DATA
        // Disarankan hanya mengambil field spesifik agar user tidak bisa inject data lain (misal ganti role)
        const updatedUser = await prisma.tb_user.update({
            where: { id: userId },
            data: {
                username: body.username, // Ambil spesifik field
                notelp: body.notelp,     // Ambil spesifik field
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Profil berhasil diperbarui",
                data: updatedUser,
            },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error("PUT Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500, headers: corsHeaders }
        );
    }
};