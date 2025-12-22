import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service tampil data
export const GET = async () => {

    // ambil data
    const data = await prisma.tb_order.findMany({
        orderBy: {
            id: 'asc'
        }
    });

    // tampilkan response
    return NextResponse.json(
        {
            order: data
        },
        {
            status: 200
        }
    )
}

// buat service simpan data
export const POST = async (request: NextRequest) => {

    // buat dalam format json
    const data = await request.json();

    // mengecek apakah data order sudah ada
    const check = await prisma.tb_order.findFirst({
        where: {
            kodeOrder: data.kodeOrder
        },
        select: {
            kodeOrder: true
        }
    })

    // jika order sudah ditemukan
    if (check) {
        return NextResponse.json(
            {
                message: "Data Gagal Dibuat ! (Kode Order Sudah Ada)",
                success: false
            },
            {
                status: 400
            }
        )
    }

    // jika order tidak ditemukan
    await prisma.tb_order.create({
        data: {
            kodeOrder: data.kodeOrder,
            kamarId: data.kamarId,
            userId: data.userId,
            tanggalCheckin: new Date(data.tanggalCheckin),
            tanggalCheckout: new Date(data.tanggalCheckout),
            statusPembayaran: data.statusPembayaran || "Pending",
            totalHarga: data.totalHarga,
            metodePembayaran: data.metodePembayaran,
            buktiPembayaran: data.buktiPembayaran || null,
            catatanUser: data.catatanUser || null,
            catatanAdmin: data.catatanAdmin || null
        }
    })

    // tampilkan respon
    return NextResponse.json(
        {
            message: "Data Berhasil Dibuat !",
            success: true
        },
        {
            status: 201
        }
    )
}