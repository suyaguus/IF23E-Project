import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service delete data
export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const perabotanId = Number(id);

    if (isNaN(perabotanId)) {
        return NextResponse.json({
            success: false,
            message: "id tidak valid",
        });
    }

    const perabotan = await prisma.tb_perabotan.findUnique({
        where: { id: perabotanId },
    });

    if (!perabotan) {
        return NextResponse.json({
            success: false,
            message: "perabotan tidak ditemukan",
        });
    }

    await prisma.tb_perabotan.delete({
        where: { id: perabotanId },
    });

    return NextResponse.json({
        success: true,
        message: "perabotan berhasil dihapus",
    });
}

// buat service update data
export const PUT = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const perabotanId = Number(id);
    const data = await req.json();

    if (isNaN(perabotanId)) {
        return NextResponse.json({
            success: false,
            message: "id tidak valid",
        });
    }

    const perabotan = await prisma.tb_perabotan.findUnique({
        where: { id: perabotanId },
    });

    if (!perabotan) {
        return NextResponse.json({
            success: false,
            message: "perabotan tidak ditemukan",
        });
    }

    await prisma.tb_perabotan.update({
        where: { id: perabotanId },
        data: data,
    });

    return NextResponse.json({
        success: true,
        message: "perabotan berhasil diupdate",
    });
}