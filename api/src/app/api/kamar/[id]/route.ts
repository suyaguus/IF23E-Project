import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// fungsi untuk menghapus data
export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
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
};

// buat fungsi update data
export const PUT = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
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
};

// buat fungsi get data berdasarkan id
export const GET = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
        const { id } = await context.params;
        const kamarId = Number(id);

        if (isNaN(kamarId)) {
            return NextResponse.json({
                success: false, message: "id tidak valid"
            });
        }

        const kamar = await prisma.tb_kamar.findUnique({
            where: { id: kamarId },
            select: {
                nomorKamar: true,
                hargaSewa: true,
                statusKamar: true,
                deskripsi: true
            }
        }); 

        if (!kamar) {
            return NextResponse.json({
                success: false, message: "kamar tidak ditemukan"
            });
        }

        return NextResponse.json({
            success: true, message: "kamar berhasil ditemukan", data: kamar
        });
};  