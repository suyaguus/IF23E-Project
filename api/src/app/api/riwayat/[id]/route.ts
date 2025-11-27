import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service delete data
export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const riwayatId = Number(id);

    if (isNaN(riwayatId)) {
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

    const riwayat = await prisma.tb_riwayat_pembayaran.findUnique({
        where: { id: riwayatId },
    });

    if (!riwayat) {
        return NextResponse.json(
            {
                success: false,
                message: "Riwayat Tidak Ditemukan",
            },
            {
                status: 404
            }
        );
    }

    await prisma.tb_riwayat_pembayaran.delete({
        where: { id: riwayatId },
    });

    return NextResponse.json(
        {
            success: true,
            message: "Riwayat Berhasil Di Hapus",
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
    const riwayatId = Number(id);
    const data = await req.json();

    if (isNaN(riwayatId)) {
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

    const riwayat = await prisma.tb_riwayat_pembayaran.findUnique({
        where: { id: riwayatId },
    });

    if (!riwayat) {
        return NextResponse.json(
            {
                success: false,
                message: "Riwayat Tidak Ditemukan",
            },
            {
                status: 404
            }
        );
    }

    await prisma.tb_riwayat_pembayaran.update({
        where: { id: riwayatId },
        data: data,
    });

    return NextResponse.json(
        {
            success: true,
            message: "Riwayat Berhasil Diubah",
            data: data
        },
        {
            status: 200
        }
    )
}

// buat get berdasarkan id
export const GET = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const riwayatId = Number(id);

    if (isNaN(riwayatId)) {
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

    const riwayat = await prisma.tb_riwayat_pembayaran.findUnique({
        where: { id: riwayatId },
    });

    if (!riwayat) {
        return NextResponse.json(
            {
                success: false,
                message: "Riwayat Tidak Ditemukan",
            },
            {
                status: 404
            }
        );
    }

    return NextResponse.json(
        {
            success: true,
            data: riwayat
        },
        {
            status: 200
        }
    )
}