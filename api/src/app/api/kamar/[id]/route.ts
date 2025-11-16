import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// fungsi untuk menghapus data
export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    try {
        const { id } = await context.params;
        const kamarId = Number(id);

        if (isNaN(kamarId)) {
            return NextResponse.json({
                success: false, message: "id tidak valid"
            });
        }

        const kamar = await prisma.tb_kamar.findUnique({
            where: { id: kamarId }
        });

        if (!kamar) {
            return NextResponse.json({
                success: false, message: "kamar tidak ditemukan"
            });
        }

        await prisma.tb_kamar.delete({
            where: { id: kamarId }
        });

        return NextResponse.json({
            success: true, message: "kamar berhasil dihapus"
        });

    } catch (error) {
        return NextResponse.json({
            success: false, message: "terjadi kesalahan"
        });
    }
};

// buat fungsi update data
export const PUT = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    try {
        const { id } = await context.params;
        const kamarId = Number(id);
        const data = await req.json();

        if (isNaN(kamarId)) {
            return NextResponse.json({
                success: false, message: "id tidak valid"
            });
        }

        const kamar = await prisma.tb_kamar.findUnique({
            where: { id: kamarId }
        });

        if (!kamar) {
            return NextResponse.json({
                success: false, message: "kamar tidak ditemukan"
            });
        }

        await prisma.tb_kamar.update({
            where: { id: kamarId },
            data: data
        });

        return NextResponse.json({
            success: true, message: "kamar berhasil diupdate"
        });

    } catch (error) {
        return NextResponse.json({
            success: false, message: "terjadi kesalahan"
        });
    }
}