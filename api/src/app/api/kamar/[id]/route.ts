import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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