import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";  // Sesuaikan dengan path Prisma Anda

export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const userId = Number(id);

    if (isNaN(userId)) {
        return NextResponse.json(
            { success: false, message: "id tidak valid" },
        );
    }

    const user = await prisma.tb_user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        return NextResponse.json(
            { success: false, message: "user tidak ditemukan" },
        );
    }

    // Step 1: Delete related orders or any other records referencing the user
    await prisma.tb_order.deleteMany({
        where: { userId: userId }, // Assuming userId is the foreign key in tb_order
    });

    // Step 2: Delete the user
    await prisma.tb_user.delete({
        where: { id: userId },
    });

    return NextResponse.json({
        success: true,
        message: "Data User Berhasil di Hapus",
    });

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
                { success: false, message: "id tidak valid" },
            );
        }

        const user = await prisma.tb_user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                email: true,
                password: true,
                role: true
            }
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "user tidak ditemukan" },
            );
        }

        return NextResponse.json(
            { success: true, message: "Data berhasil ditemukan", user },
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "server error", error: String(error) },
        );
    }
}

// buat putt data
export const PUT = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    try {
        const { id } = await context.params;
        const userId = Number(id);
        const data = await req.json();

        if (isNaN(userId)) {
            return NextResponse.json(
                { success: false, message: "id tidak valid" },
            );
        }

        const user = await prisma.tb_user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "user tidak ditemukan" },
            );
        }

        await prisma.tb_user.update({
            where: { id: userId },
            data: data,
        });

        return NextResponse.json(
            { success: true, message: "Data berhasil diubah" },
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "server error", error: String(error) },
        );
    }
}