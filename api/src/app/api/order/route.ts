import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async() => {
    const data = await prisma.tb_order.findMany({
        orderBy: {
            id: 'asc'
        }
    });

    return NextResponse.json({
        order: data
    })
}

// buat service simpan data
export const POST = async (request: NextRequest) => {

    // buat dalam format json
    const data = await request.json();

    // ✅ PERBAIKAN 1: Cek berdasarkan kodeOrder, bukan ID
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
        return NextResponse.json({
            message: "Data Gagal Disimpan ! (Kode Order Sudah Ada)",
            success: false
        })
    }

    // ✅ PERBAIKAN 2: Jangan kirim ID, biarkan auto-increment
    // ✅ PERBAIKAN 3: Jangan kirim tanggalPesanan, sudah ada @default(now())
    // ✅ PERBAIKAN 4: Convert tanggal ke Date object
    await prisma.tb_order.create({
        data: {
            // id: data.id,  ❌ HAPUS INI - auto increment
            kodeOrder: data.kodeOrder,
            kamarId: data.kamarId,
            userId: data.userId,
            // tanggalPesanan: data.tanggalPesanan,  ❌ HAPUS INI - sudah default now()
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
    return NextResponse.json({
        message: "Data Berhasil Disimpan !",
        success: true
    })
}