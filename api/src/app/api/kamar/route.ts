import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    const data = await prisma.tb_kamar.findMany({
        orderBy: {
            id: "asc",
        },
    });

    return NextResponse.json(
        {
            kamar: data,
        },
        {
            status: 200,
        }
    );
}

// buat service simpan data
export const POST = async (request: NextRequest) => {

    // buat dalam format json
    const data = await request.json();

    // mengecek apakah data kamar sudah ada 
    const check = await prisma.tb_kamar.findFirst({
        where: {
            nomorKamar: data.nomorKamar
        },
        select: {
            nomorKamar: true
        }
    })

    // jika nomor kamar ditemukan
    if (check) {
        return NextResponse.json(
            {
                message: "Data Kamar Gagal Disimpan ! (Nomor Kamar sudah digunakan)",
                success: false
            },
            {
                status: 400
            }
        )
    }

    // jika nomor kamar tidak ditemukan
    await prisma.tb_kamar.create({
        data: {
            nomorKamar: data.nomorKamar,
            hargaSewa: data.hargaSewa,
            statusKamar: data.statusKamar || "Tersedia",
            deskripsi: data.deskripsi
        }
    })

    // tampilkan respon
    return NextResponse.json(
        {
            message: "Data Kamar Berhasil DIbuat !",
            success: true
        },
        {
            status: 201
        }
    )
}