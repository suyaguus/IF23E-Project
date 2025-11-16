import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service delete data
export const DELETE = async (
    req: NextRequest,
    context: {params: Promise<{id: string}>}
) => {
    const { id } = await context.params;
    const orderId = Number(id);

    if (isNaN(orderId)) {
        return NextResponse.json({
            success: false,
            message: "id tidak valid",
        });
    }

    const order = await prisma.tb_order.findUnique({
        where: { id: orderId },
    });

    if (!order) {
        return NextResponse.json({
            success: false,
            message: "order tidak ditemukan",
        });
    }

    await prisma.tb_order.delete({
        where: { id: orderId },
    });

    return NextResponse.json({
        success: true,
        message: "order berhasil dihapus",
    });
}

// buat service update data
export const PUT = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const orderId = Number(id);
    const data = await req.json();

    if (isNaN(orderId)) {
        return NextResponse.json({
            success: false,
            message: "id tidak valid",
        });
    }

    const order = await prisma.tb_order.findUnique({
        where: { id: orderId },
    });

    if (!order) {
        return NextResponse.json({
            success: false,
            message: "order tidak ditemukan",
        });
    }

    await prisma.tb_order.update({
        where: { id: orderId },
        data: data,
    });

    return NextResponse.json({
        success: true,
        message: "order berhasil diupdate",
    });
}