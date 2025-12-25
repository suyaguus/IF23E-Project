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

        // validasi id
        if (isNaN(kamarId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "ID Tidak Valid"
                },
                {
                    status: 400
                }
            );
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

        // jika kamar tidak ditemukan
        if (!kamar) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Kamar Tidak Ditemukan"
                },
                {
                    status: 404
                }
            );
        }

        // jika kamar memiliki relasi order maka tidak bisa dihapus
        if (kamar.orders.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Kamar Tidak Dapat Dihapus Karena Memiliki ${kamar.orders.length} Order Aktif`
                },
                {
                    status: 400
                }
            );
        }

        // jika kamar memiliki relasi riwayat pembayaran maka tidak bisa dihapus
        if (kamar.riwayatPembayaran.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Kamar Tidak Dapat Dihapus Karena Memiliki Riwayat Pembayaran"
                },
                {
                    status: 400
                }
            );
        }

        // hapus kamar beserta relasinya dalam transaksi
        await prisma.$transaction(async (tx) => {

            // hapus relasi many-to-many terlebih dahulu
            await tx.tb_kamar_fasilitas.deleteMany({
                where: { kamarId: kamarId }
            });

            await tx.tb_kamar_perabotan.deleteMany({
                where: { kamarId: kamarId }
            });

            // sekarang hapus kamar
            await tx.tb_kamar.delete({
                where: { id: kamarId }
            });
        });

        // response sukses
        return NextResponse.json(
            {
                success: true,
                message: "Kamar Berhasil Di Hapus"
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.error("Error saat menghapus kamar:", error);

        // response error
        return NextResponse.json(
            {
                success: false,
                message: "Terjadi Kesalahan Saat Menghapus Kamar",
                error: error instanceof Error ? error.message : String(error)
            },
            {
                status: 500
            }
        );
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

    // validasi id
    if (isNaN(kamarId)) {
        return NextResponse.json(
            {
                success: false, message: "ID Tidak Valid"
            },
            {
                status: 400
            }
        );
    }

    // cek apakah kamar ada berdasarkan id
    const kamar = await prisma.tb_kamar.findUnique({
        where: { id: kamarId }
    });

    // jika kamar tidak ditemukan
    if (!kamar) {
        return NextResponse.json(
            {
                success: false,
                message: "Kamar Tidak Ditemukan"
            },
            {
                status: 404
            }
        );
    }

    // update kamar
    await prisma.tb_kamar.update({
        where: { id: kamarId },
        data: data
    });

    // response sukses
    return NextResponse.json(
        {
            success: true,
            message: "Kamar Berhasil Diubah"
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
    const kamarId = Number(id);

    // validasi id
    if (isNaN(kamarId)) {
        return NextResponse.json(
            {
                success: false,
                message: "ID Tidak Valid"
            },
            {
                status: 400
            }
        );
    }

    // ambil data kamar berdasarkan id
    const kamar = await prisma.tb_kamar.findUnique({
        where: { id: kamarId },
        select: {
            nomorKamar: true,
            hargaSewa: true,
            statusKamar: true,
            deskripsi: true
        }
    });

    // jika kamar tidak ditemukan
    if (!kamar) {
        return NextResponse.json(
            {
                success: false,
                message: "Kamar Tidak Ditemukan"
            },
            {
                status: 404
            }
        );
    }

    // response sukses
    return NextResponse.json({
        success: true,
        message: "Kamar Berhasil Ditemukan",
        data: kamar
    },
        {
            status: 200
        }
    );
};  