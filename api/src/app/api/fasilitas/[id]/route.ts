import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat fungsi delete data
export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const fasilitasId = Number(id);

    if (isNaN(fasilitasId)) {
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

    const fasilitas = await prisma.tb_fasilitas.findUnique({
        where: { id: fasilitasId },
    });

    if (!fasilitas) {
        return NextResponse.json(
            {
                success: false,
                message: "Fasilitas Tidak Ditemukan",
            },
            {
                status: 404
            }
        );
    }

    await prisma.tb_fasilitas.delete({
        where: { id: fasilitasId },
    });

    return NextResponse.json(
        {
            success: true,
            message: "Fasilitas Berhasil Di Hapus",
        },
        {
            status: 200
        }
    );
};

// buat fungsi update data
export const PUT = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const fasilitasId = Number(id);
    const data = await req.json();

    if (isNaN(fasilitasId)) {
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

    const fasilitas = await prisma.tb_fasilitas.findUnique({
        where: { id: fasilitasId },
    });

    if (!fasilitas) {
        return NextResponse.json(
            {
                success: false,
                message: "Fasilitas Tidak Ditemukan"
            },
            {
                status: 404
            }
        );
    }

    await prisma.tb_fasilitas.update({
        where: { id: fasilitasId },
        data: data,
    });

    return NextResponse.json(
        {
            success: true,
            message: "Fasilitas Berhasil Diubah",
        },
        {
            status: 200
        }
    );
};

// buat fungsi get data berdasarkan id
export const GET = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const fasilitasId = Number(id);

    if (isNaN(fasilitasId)) {
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

    const fasilitas = await prisma.tb_fasilitas.findUnique({
        where: { id: fasilitasId },
    });

    if (!fasilitas) {
        return NextResponse.json(
            {
                success: false,
                message: "Fasilitas Tidak Ditemukan",
            },
            {
                status: 404
            }
        );
    }

    return NextResponse.json(
        {
            success: true,
            data: fasilitas,
        },
        {
            status: 200
        }
    );
}