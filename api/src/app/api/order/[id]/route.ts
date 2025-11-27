import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service delete data
export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const orderId = Number(id);

    if (isNaN(orderId)) {
        return NextResponse.json(
            {
                success: false,
                message: "ID Tidak Valid",
            },
            {
                status: 400
            }
        );
    }

    const order = await prisma.tb_order.findUnique({
        where: { id: orderId },
    });

    if (!order) {
        return NextResponse.json(
            {
                success: false,
                message: "Order Tidak Ditemukan",
            },
            {
                status: 404
            }
        );
    }

    await prisma.tb_order.delete({
        where: { id: orderId },
    });

    return NextResponse.json(
        {
            success: true,
            message: "Order Berhasil Di Hapus",
        },
        {
            status: 200
        }
    );
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
        return NextResponse.json(
            {
                success: false,
                message: "ID Tidak Valid",
            },
            {
                status: 400
            }
        );
    }

    const order = await prisma.tb_order.findUnique({
        where: { id: orderId },
    });

    if (!order) {
        return NextResponse.json(
            {
                success: false,
                message: "Order Tidak Ditemukan",
            },
            {
                status: 404
            }
        );
    }

    await prisma.tb_order.update({
        where: { id: orderId },
        data: data,
    });

    return NextResponse.json(
        {
            success: true,
            message: "Order Berhasil Diubah",
        },
        {
            status: 200
        }
    );
}

// buat service get by id
export const GET = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const orderId = Number(id);

    if (isNaN(orderId)) {
        return NextResponse.json(
            {
                success: false,
                message: "ID Tidak Valid",
            },
            {
                status: 400
            }
        );
    }

    const order = await prisma.tb_order.findUnique({
        where: { id: orderId },
    });

    if (!order) {
        return NextResponse.json(
            {
                success: false,
                message: "Order Tidak Ditemukan",
            },
            {
                status: 404
            }
        );
    }

    return NextResponse.json(
        {
            success: true,
            data: order,
        },
        {
            status: 200
        }
    );
}