import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service tampil data
export const GET = async () => {

    // ambil data
    const data = await prisma.tb_riwayat_pembayaran.findMany({
        orderBy: {
            id: 'asc'
        }
    });

    // tampilkan respon
    return NextResponse.json(
        {
            riwayat: data
        },
        {
            status: 200
        }
    )
}

// buat service simpan data
export const POST = async (request: NextRequest) => {
    const data = await request.json();

    // cek duplikasi menggunakan kodeRiwayat (bukan id)
    const check = await prisma.tb_riwayat_pembayaran.findUnique({
        where: {
            kodeRiwayat: data.kodeRiwayat
        }
    })

    // jika riwayat sudah ada
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

    // tampilkan respon
    return NextResponse.json(
        {
            message: "Data Berhasil Dibuat !",
            success: true
        }, {
        status: 201
    }
    )
}