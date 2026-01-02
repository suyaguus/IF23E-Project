import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service delete data
export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const orderId = Number(id);

    // validasi id
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

    // cek apakah order ada berdasarkan id
    const order = await prisma.tb_order.findUnique({
        where: { id: orderId },
    });

    // jika order tidak ditemukan
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

    // hapus order
    await prisma.tb_order.delete({
        where: { id: orderId },
    });

    // tampilkan response
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

    // ambil id dari params
    const { id } = await context.params;
    const orderId = Number(id);
    const data = await req.json();

    // validasi id
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

    // cek apakah order ada berdasarkan id
    const order = await prisma.tb_order.findUnique({
        where: { id: orderId },
    });

    // jika order tidak ditemukan
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

    // update order
    await prisma.tb_order.update({
        where: { id: orderId },
        data: data,
    });

    // response sukses
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

    // validasi id
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

    // cari data order berdasarkan id
    const order = await prisma.tb_order.findUnique({
        where: { id: orderId },
    });

    // jika order tidak ditemukan
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

    // tampilkan response
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