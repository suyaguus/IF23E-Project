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
                success: false,
                message: "id tidak valid"
            }, { status: 400 });
        }

        // Cek apakah kamar exists dan ambil relasi
        const kamar = await prisma.tb_kamar.findUnique({
            where: { id: kamarId },
            include: {
                orders: true,
                riwayatPembayaran: true,
                fasilitas: true,
                perabotan: true
            }
        });

        if (!kamar) {
            return NextResponse.json({
                success: false,
                message: "kamar tidak ditemukan"
            }, { status: 404 });
        }

        // Cek apakah kamar memiliki order atau riwayat pembayaran
        if (kamar.orders.length > 0) {
            return NextResponse.json({
                success: false,
                message: `Kamar tidak dapat dihapus karena memiliki ${kamar.orders.length} order aktif`
            }, { status: 400 });
        }

        if (kamar.riwayatPembayaran.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Kamar tidak dapat dihapus karena memiliki riwayat pembayaran"
            }, { status: 400 });
        }

        // Gunakan transaction untuk menghapus relasi dan kamar
        await prisma.$transaction(async (tx) => {
            // Hapus relasi many-to-many terlebih dahulu
            await tx.tb_kamar_fasilitas.deleteMany({
                where: { kamarId: kamarId }
            });

            await tx.tb_kamar_perabotan.deleteMany({
                where: { kamarId: kamarId }
            });

            // Sekarang hapus kamar
            await tx.tb_kamar.delete({
                where: { id: kamarId }
            });
        });

        return NextResponse.json({
            success: true,
            message: "kamar berhasil dihapus"
        }, { status: 200 });

    } catch (error) {
        console.error("Error saat menghapus kamar:", error);

        return NextResponse.json({
            success: false,
            message: "Terjadi kesalahan saat menghapus kamar",
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
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