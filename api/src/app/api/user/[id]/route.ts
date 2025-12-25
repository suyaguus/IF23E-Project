import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// buat service delete
export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const userId = Number(id);

    // validasi id
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

    // cek apakah user ada
    const user = await prisma.tb_user.findUnique({
        where: { id: userId },
    });

    // jika user tidak ditemukan
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

    // hapus data
    await prisma.tb_order.deleteMany({
        where: { userId: userId },
    });

    await prisma.tb_user.delete({
        where: { id: userId },
    });

    // tampilkan response
    return NextResponse.json(
        {
            success: true,
            message: "Data User Berhasil Di Hapus",
        },
        {
            status: 200
        }
    );
};


// get user berdasarkan id
export const GET = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    try {
        const { id } = await context.params;
        const userId = Number(id);

        // validasi id
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

        // cek apakah user ada
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

        // jika user tidak ditemukan
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

        // tampilkan response
        return NextResponse.json(
            {
                success: true, message: "Data Berhasil Ditemukan", user
            },
            {
                status: 200
            }
        );

    } catch (error) {
        // tampilkan error
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

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await req.json();
        const { email, username, notelp } = body;

        if (!email) {
            return NextResponse.json(
                { success: false, message: "Email user wajib disertakan." },
                { status: 400, headers: corsHeaders }
            );
        }

        const existingUser = await prisma.tb_user.findUnique({
            where: { email: email },
        });

        if (!existingUser) {
            return NextResponse.json(
                { success: false, message: "User tidak ditemukan." },
                { status: 404, headers: corsHeaders }
            );
        }

        const dataToUpdate: Partial<{ username: string; notelp: string }> = {};

        if (username !== undefined && username !== null && username.trim() !== "") {
            dataToUpdate.username = username;
        }
        if (notelp !== undefined && notelp !== null && notelp.trim() !== "") {
            dataToUpdate.notelp = notelp;
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return NextResponse.json(
                { success: true, message: "Tidak ada data yang diubah.", data: existingUser },
                { status: 200, headers: corsHeaders }
            );
        }

        const updatedUser = await prisma.tb_user.update({
            where: { email: email },
            data: dataToUpdate,
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
        console.error("[API Error] PUT /api/user/[id]:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500, headers: corsHeaders }
        );
    }
}