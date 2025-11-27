import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    const data = await prisma.tb_riwayat_pembayaran.findMany({
        orderBy: {
            id: 'asc'
        }
    });

    return NextResponse.json(
        {
            riwayat: data
        },
        {
            status: 200
        }
    )
}

export const POST = async (request: NextRequest) => {
    const data = await request.json();

    // Cek duplikasi menggunakan kodeRiwayat (bukan id)
    const check = await prisma.tb_riwayat_pembayaran.findUnique({
        where: {
            kodeRiwayat: data.kodeRiwayat
        }
    })

    if (check) {
        return NextResponse.json(
            {
                message: "Data Gagal Dibuat ! (Riwayat Sudah Ada)",
                success: false
            },
            {
                status: 400
            }
        )
    }

    // Tambahkan orderId, userId, kamarId yang required
    await prisma.tb_riwayat_pembayaran.create({
        data: {
            kodeRiwayat: data.kodeRiwayat,
            orderId: data.orderId,
            userId: data.userId,
            kamarId: data.kamarId,
            statusPembayaranLama: data.statusPembayaranLama,
            statusPembayaranBaru: data.statusPembayaranBaru,
            totalHarga: data.totalHarga,
            metodePembayaran: data.metodePembayaran,
            buktiPembayaran: data.buktiPembayaran,
            keterangan: data.keterangan,
            diubahOleh: data.diubahOleh
        }
    })

    return NextResponse.json(
        {
            message: "Data Berhasil Dibuat !",
            success: true
        }, {
        status: 201
    }
    )
}