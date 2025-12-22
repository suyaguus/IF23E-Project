import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service delete data
export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const perabotanId = Number(id);

    // validasi id
    if (isNaN(perabotanId)) {
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

    // cek apakah perabotan ada berdasarkan id
    const perabotan = await prisma.tb_perabotan.findUnique({
        where: { id: perabotanId },
    });

    // jika perabotan tidak ditemukan
    if (!perabotan) {
        return NextResponse.json(
            {
                success: false,
                message: "Perabotan Tidak Ditemukan",
            },
            {
                status: 404
            }
        );
    }

    // hapus perabotan
    await prisma.tb_perabotan.delete({
        where: { id: perabotanId },
    });

    // tampilkan response
    return NextResponse.json(
        {
            success: true,
            message: "Perabotan Berhasil Di Hapus",
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
    const perabotanId = Number(id);
    const data = await req.json();

    // validasi id
    if (isNaN(perabotanId)) {
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

    // cek apakah perabotan ada berdasarkan id
    const perabotan = await prisma.tb_perabotan.findUnique({
        where: { id: perabotanId },
    });

    // response jika perabotan tidak ditemukan
    if (!perabotan) {
        return NextResponse.json(
            {
                success: false,
                message: "Perabotan Tidak Ditemukan",
            },
            {
                status: 404
            }
        );
    }

    // update perabotan
    await prisma.tb_perabotan.update({
        where: { id: perabotanId },
        data: data,
    });

    // tampilkan response
    return NextResponse.json(
        {
            success: true,
            message: "Perabotan Berhasil Diubah",
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
    const perabotanId = Number(id);

    // validasi id
    if (isNaN(perabotanId)) {
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

    // cek apakah perabotan ada berdasarkan id
    const perabotan = await prisma.tb_perabotan.findUnique({
        where: { id: perabotanId },
    });

    // response jika perabotan tidak ditemukan
    if (!perabotan) {
        return NextResponse.json(
            {
                success: false,
                message: "Perabotan Tidak Ditemukan",
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
            data: perabotan,
        },
        {
            status: 200
        }
    );
}